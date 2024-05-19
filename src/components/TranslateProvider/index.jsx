import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext({});

export const t = (key) => {
  return global.t?.(key);
};

const global = {};

const TranslateProvider = ({ children, translate, defaultLang }) => {
  const [lang, setLang] = useState(
    () => JSON.parse(localStorage.getItem("lang")) || defaultLang
  );

  const _t = (key) => {
    return translate?.[lang]?.[key] || key;
  };

  useEffect(() => {
    global.t = _t;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("lang", JSON.stringify(lang));
  }, [lang]);
  
  return (
    <Context.Provider value={{ t: _t, setLang, lang }}>
      {children}
    </Context.Provider>
  );
};

export const useTranslate = () => {
  const context = useContext(Context);

  if (typeof context === "undefined")
    throw new Error("The Component must be consumped within TranslateProvider");

  return context;
};

export default TranslateProvider;
