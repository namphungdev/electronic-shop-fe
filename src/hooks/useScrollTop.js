import { useEffect } from "react";

const useScrollTop = (dependencyList = [], top = 0) => {
  useEffect(() => {
    window.scroll({
      top: top,
      behavior: "smooth",
    });
  }, [...dependencyList]);
};

export default useScrollTop;
