import {
  localStorageCache,
  reduxStorageCache,
  sessionStorageCache,
} from "@/utils";
import { CanceledError } from "axios";
import { useEffect, useReducer, useRef } from "react";
import { delayDuration } from "@/utils";

const SET_DATA = "setData";
const SET_LOADING = "setLoading";
const SET_ERROR = "setError";
const SET_STATUS = "setStatus";

const queryReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_DATA: {
      return { ...state, data: payload };
    }
    case SET_LOADING: {
      return { ...state, loading: payload };
    }
    case SET_ERROR: {
      return { ...state, error: payload };
    }
    case SET_STATUS: {
      return { ...state, status: payload };
    }

    default:
      return state;
  }
};

const cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
  redux: reduxStorageCache,
};

const _asyncFunction = {
  // key: Promise
};

const useQuery = ({
  queryFn,
  queryKey,
  cacheTime,
  dependencyList = [],
  storage,
  limitDuration,
  onSuccess,
  onError,
  enabled = true,
  keepPreviousData = false,
  keepStorage = true,
}) => {
  const [{ data, loading, error, status }, dispatch] = useReducer(
    queryReducer,
    {
      data: {},
      loading: enabled,
      error: new Error(""),
      status: "idle",
    }
  );
  const reFetchRef = useRef(); //call api
  const _cache = cache[storage]; //storage
  const dataRef = useRef({}); //keepPreviousData
  const controllerRef = useRef(new AbortController()); //cancelRequest axios
  const _queryKey = Array.isArray(queryKey)
    ? queryKey?.[0]
    : typeof queryKey === "string"
    ? queryKey
    : undefined;
  //====== cancel when out the page ====
  useEffect(() => {
    return () => {
      controllerRef.current.abort();
    };
  }, []);
  
  useEffect(() => {
    if (typeof reFetchRef.current === "boolean") {
      reFetchRef.current = true;
    }
  }, [...dependencyList]);

  const getCacheDataOrPreviousData = () => {
    if (reFetchRef.current) return;
    //======= keep old data =======
    if (_queryKey) {
      if (keepPreviousData && dataRef.current[_queryKey]) {
        return dataRef.current[_queryKey];
      }
      // ===== tránh call lại api khi trùng queryKey ====
      if (_asyncFunction[_queryKey]) {
        return _asyncFunction[_queryKey];
      }

      if (_cache) {
        return _cache.get(_queryKey);
      }
    }

    return;
  };

  const setCacheDataOrPreviousData = (data) => {
    if (_queryKey && data) {
      if (keepPreviousData) {
        dataRef.current[_queryKey] = data;
      }

      if (_cache) {
        const expire = cacheTime || 0 + Date.now();
        _cache.set(_queryKey, data, expire);
      }
    }
  };
  const clearPreviousData = (queryKey) => {
    if (keepPreviousData && dataRef.current[queryKey]) {
      delete dataRef.current[queryKey];
    }
  };
  const clearAllData = () => {
    dataRef.current = {};
    for (const key in _asyncFunction) {
      if (_asyncFunction.hasOwnProperty(key)) {
        delete _asyncFunction[key];
      }
    }
  };
  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled].concat(queryKey, dependencyList));

  const fetchData = async (...params) => {
    //hủy api cũ khi chưa call xong
    controllerRef.current.abort();
    //tạo signal api mới
    controllerRef.current = new AbortController();
    const startTime = Date.now();
    dispatch({ type: SET_LOADING, payload: true });
    dispatch({ type: SET_STATUS, payload: "pending" });
    try {
      let res;

      res = getCacheDataOrPreviousData();

      if (!res) {
        // call api
        res = queryFn({ signal: controllerRef.current.signal, params });

        //==== gán dữ liệu cho _asyncFunction
        if (_queryKey && _asyncFunction) {
          _asyncFunction[_queryKey] = res;
        }
      }

      if (res instanceof Promise) {
        res = await res;
      }
      await delayDuration(startTime, limitDuration);
      if (res) {
        await onSuccess?.(res);
        dispatch({ type: SET_DATA, payload: res });
        dispatch({ type: SET_STATUS, payload: "success" });
        setCacheDataOrPreviousData(res);
        reFetchRef.current = false;
        dispatch({ type: SET_LOADING, payload: false });

        if (!keepStorage) {
          delete _asyncFunction[_queryKey];
        }
        return res;
      }
    } catch (err) {
      // error = err;
      await delayDuration(startTime, limitDuration);
      if (err instanceof CanceledError) {
      } else {
        onError?.(err);
        dispatch({ type: SET_ERROR, payload: new Error(err?.message) });
        dispatch({ type: SET_STATUS, payload: "error" });
        dispatch({ type: SET_LOADING, payload: false });
        console.log(
          "%cerror useQuery.js line:153 ",
          "color: red; display: block; width: 100%;",
          err
        );
        throw err;
      }
    }
  };

  return {
    data,
    loading,
    error,
    status,
    fetchData,
    clearPreviousData,
    clearAllData,
  };
};
export default useQuery;
