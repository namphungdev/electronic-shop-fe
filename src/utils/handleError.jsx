import { t } from "@/components/TranslateProvider";
import { message } from "antd";
import { toast } from "react-toastify";
import { clearWaititngQueue } from "./clearWaitingQueue";
const handleError = (error, antd, key) => {
  console.log(
    "%cerror handleError.js line:3 ",
    "color: red; display: block; width: 100%;",
    error
  );
  clearWaititngQueue();
  // toast.dismiss();
  if (antd) {
    return message.error({
      key,
      content: error?.response?.data?.message,
    });
  }
  // if (error?.response?.data?.message === "Username or Password incorrect!") {
  //   return toast.error(
  //     () => (
  //       <p>
  //         <span className="text-red-500 font-semibold">Email</span> hoặc{" "}
  //         <span className="text-red-500 font-semibold">Mật khẩu</span> không
  //         đúng. Vui lòng kiểm tra lại
  //       </p>
  //     ),
  //     {
  //       autoClose: 2000,
  //     }
  //   );
  // }
  toast.error(t(error?.response?.data?.message), {
    style: {
      fontSize: 14,
    },
    autoClose: 2000,
  });
};
export default handleError;
