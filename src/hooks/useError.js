import { useEffect } from "react";
import { toast } from "react-toastify";

const useError = (errors) => {
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0 && arrErrors[0]) {
      toast.error(arrErrors[0], {
        pauseOnHover: false,
        autoClose: 2000,
      });
    }
  }, [Object.values(errors)[0]]);
};
export default useError;
