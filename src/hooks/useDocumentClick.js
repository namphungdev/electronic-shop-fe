import { useEffect } from "react";

const useDocumentClick = (onDocumentClick = () => {}) => {
  useEffect(() => {
    const onClick = onDocumentClick;
    document.addEventListener("click", onClick);

    // ==
    return () => document.removeEventListener("click", onClick);
  }, []);
};

export default useDocumentClick;
