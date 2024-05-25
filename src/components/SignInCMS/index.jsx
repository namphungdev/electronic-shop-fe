import React, { memo, useEffect, useState } from "react";
import Field from "@/components/Field";
import { useDispatch } from "react-redux";
import { loginAction, loginByCodeAction } from "@/stores/auth/authReducer";
import {
  copyToClipBoard,
  getRemember,
  setRemember,
  min,
  required,
  clearRemember,
} from "@/utils";
import { useForm } from "@/hooks/useForm";
import useQueryParams from "@/hooks/useQueryParams";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";
import { message } from "antd";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const SignInCMS = () => {
  const { loading } = useAuth();
  const _loading = loading.login || false;
  const [checkRemember, setCheckRemember] = useState(
    getRemember()?.checked || false
  );
  const dispatch = useDispatch();
  const [{ code }] = useQueryParams();
  const { form, validate, formRef, register } = useForm(
    {
      username: [
        required({ message: "Vui lòng nhập địa chỉ email" }),
        // regex("email", "Email chưa chính xác"),
      ],
      password: [
        required({ message: "Vui lòng nhập mật khẩu" }),
        min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      ],
    },
    {
      initialValue: {
        username: getRemember()?.username,
        password: getRemember()?.password,
      },
    }
  );

  const onLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      await dispatch(
        loginAction({
          ...form,
        })
      );

      setTimeout(() => {
        // Show the toast message with the latest value stored in localStorage
        toast.success(localStorage.getItem('message_error'));

        // Remove the message from localStorage
        localStorage.removeItem('message_error');
      }, 1000);

      if (checkRemember) {
        setRemember({
          username: form.username,
          password: form.password,
          checked: true,
        });
      } else {
        clearRemember();
      }
    }
  };
  useEffect(() => {
    if (code) {
      dispatch(
        loginByCodeAction({
          code,
          onSuccess: (user) => {
            toast.success(
              <p>
                Chúc mừng{" "}
                <span className="text-[#34d399] font-bold">{user?.name}</span>{" "}
                đã đăng nhập thành công!
              </p>,
              {
                position: "top-center",
              }
            );
          },

        })
      );
    }
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto w-auto d-flex h-auto"
            srcSet="/img/logos.png 2x"
          />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="select-none"
            onSubmit={onLogin}
            autoComplete="off"
            ref={formRef}
          >
            <div className="row">
              <div className="col-12">
                {/* Email */}
                <Field
                  className="form-control form-control-sm"
                  id="loginEmail"
                  placeholder="Email Address *"
                  {...register("username")}
                />
              </div>
              <div className="col-12">
                {/* Password */}
                <Field
                  className="form-control form-control-sm"
                  id="loginPassword"
                  type="password"
                  placeholder="Password *"
                  {...register("password")}
                />
              </div>
              <div className="col-12 col-md">
                {/* Remember */}
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      id="loginRemember"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="loginRemember"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12">
                {/* Button */}
                <Button loading={_loading}>Đăng nhập</Button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default memo(SignInCMS);
