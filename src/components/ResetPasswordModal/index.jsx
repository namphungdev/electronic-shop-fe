import { PATH } from "@/config";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import { regex, required } from "@/utils";
import handleError from "@/utils/handleError";
import { Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import Button from "../Button";
import Field from "../Field";

const ResetPasswordModal = ({ open, onCancel }) => {
  const { register, validate, form, reset } = useForm({
    username: [
      required({ message: "Vui lòng điền địa chỉ email" }),
      regex("email", "Địa chỉ email chưa chính xác"),
    ],
  });

  const { fetchData: resetService, loading } = useQuery({
    enabled: false,
    queryFn: () =>
      userService.resetPassword({
        ...form,
        redirect: window.location.origin + PATH.resetPassword,
      }),
    limitDuration: 1000,
  });
  const onResetPassword = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await resetService();
        toast.success(res?.message);
      } catch (error) {
        handleError(error);
      } finally {
        onCancel();
        reset();
      }
    }
  };
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      bodyStyle={{ padding: 0 }}
      maskStyle={{ padding: 0 }}
    >
      <div className="modal-content">
        <button
          type="button"
          className="close !outline-none"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onCancel}
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Forgot Password?</strong>
        </div>
        <div className="modal-body text-center">
          <p className="mb-7 font-size-sm text-gray-500">
            Vui lòng nhập địa chỉ email. Bạn sẽ nhận được đường link để nhập mật
            khẩu mới.
          </p>
          <form autoComplete="off" onSubmit={onResetPassword}>
            <Field
              className="form-control form-control-sm"
              id="modalPasswordResetEmail"
              placeholder="Email Address *"
              label="Email Address *"
              {...register("username")}
            />

            <Button className="mx-auto mt-7" loading={loading}>
              Reset Password
            </Button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;
