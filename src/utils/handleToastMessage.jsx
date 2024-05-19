import { toast } from "react-toastify";
import { clearWaititngQueue } from "./clearWaitingQueue";

export const handleToastMessage = ({ promise, pending, success, error }) => {
  toast.dismiss();
  clearWaititngQueue();
  return toast.promise(promise, {
    pending: {
      ...(pending && {
        render() {
          return pending;
        },
      }),
    },
    success: {
      ...(success && {
        render() {
          return success;
        },
      }),
    },

    error: {
      render({ data }) {
        // When the promise reject, data will contains the error
        return error || data?.response?.data?.message;
      },
    },
  });
};
