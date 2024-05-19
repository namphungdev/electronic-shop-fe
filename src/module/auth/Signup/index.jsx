import Button from "@/components/Button";
import Field from "@/components/Field";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import { clearWaititngQueue, confirm, min, regex, required } from "@/utils";
import handleError from "@/utils/handleError";
import React, { memo } from "react";
import { toast } from "react-toastify";

const Signup = () => {
  const { formRef, register, validate, form } = useForm(
    {
      name: [required({ message: "Vui lòng cho điền họ và tên" })],
      username: [
        required({ message: "Vui lòng nhập địa chỉ email" }),
        regex("email", "Vui lòng nhập địa chỉ email đúng"),
      ],
      password: [
        required({ message: "Vui lòng nhập mật khẩu" }),
        min(6, "Mật khẩu phải có ít nhất 6 kí tự"),
      ],
      confirmPassword: [
        required({ message: "Vui lòng xác nhận lại mật khẩu" }),
        confirm("password", "Mật khẩu nhập lại chưa chính xác"),
      ],
    },
    {
      dependencies: {
        password: ["confirmPassword"],
        confirmPassword: ["confirmPassword"],
      },
    }
  );
  const { loading, fetchData: registerService } = useQuery({
    enabled: false,
    limitDuration: 1000,
    queryFn: () =>
      userService.register({
        ...form,
        redirect: window.location.origin + window.location.pathname,
      }),
  });
  const onRegister = async (e) => {
    e.preventDefault();
    clearWaititngQueue();
    if (validate()) {
      try {
        const res = await registerService();
        if (res.success) {
          toast.success(res.message, {
            autoClose: 2000,
          });
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <div className="col-12 col-md-6">
      {/* Card */}
      <div className="card card-lg">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">Đăng kí tài khoản</h6>
          {/* Form */}
          <form autoComplete="off" ref={formRef} onSubmit={onRegister}>
            <div className="row">
              <div className="col-12">
                {/* Email */}
                <Field
                  className="form-control form-control-sm"
                  id="registerFirstName"
                  type="text"
                  placeholder="Họ và tên *"
                  {...register("name")}
                />
              </div>
              <div className="col-12">
                {/* Email */}
                <Field
                  className="form-control form-control-sm"
                  id="registerEmail"
                  type="text"
                  placeholder="Địa chỉ email *"
                  {...register("username")}
                />
              </div>
              <div className="col-12">
                {/* Password */}
                <Field
                  className="form-control form-control-sm"
                  id="registerPassword"
                  type="password"
                  placeholder="Mật khẩu"
                  {...register("password")}
                />
              </div>
              <div className="col-12">
                {/* Password */}
                <Field
                  className="form-control form-control-sm"
                  id="registerPasswordConfirm"
                  type="password"
                  placeholder="Xác nhận lại mật khẩu"
                  {...register("confirmPassword")}
                />
              </div>
              <div className="col-12 col-md-auto">
                {/* Link */}
                <div className="form-group font-size-sm text-muted font-light mt-5">
                  {/* By registering your details, you agree with our Terms &amp;
                  Conditions, and Privacy and Cookie Policy. */}
                  Bằng cách đăng ký thông tin, bạn đồng ý với các điều khoản &
                  điều kiện, chính sách quyền riêng tư và bảo mật của chúng tôi.
                </div>
              </div>
              <div className="col-12">
                {/* Button */}
                <Button loading={loading}>Đăng ký</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default memo(Signup);
