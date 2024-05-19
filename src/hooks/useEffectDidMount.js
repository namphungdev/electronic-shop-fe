import { useEffect, useRef } from "react";

//thực thi từ lần 2
const useEffectDidMount = (defaultFn = () => {}, dependencyList = []) => {
  const didMountRef = useRef(false);
  useEffect(() => {
    if (didMountRef.current) {
      return defaultFn();
    }

    didMountRef.current = true;
  }, dependencyList);
};

export default useEffectDidMount;
