import Button from "@/components/Button";
import Field from "@/components/Field";
import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import useBodyClass from "@/hooks/useBodyClass";
import { useForm } from "@/hooks/useForm";
import useQueryParams from "@/hooks/useQueryParams";
import { changePasswordByCodeAction } from "@/stores/auth/authReducer";
import { confirm, min, required } from "@/utils";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  useBodyClass("bg-light");
  const navigate = useNavigate();
  const { loading } = useAuth();
  const _loading = loading["changeCode"] || false;
  const [{ code }] = useQueryParams();
  useEffect(() => {
    if (!code) {
      navigate(PATH.auth);
    }
  }, []);
  const dispatch = useDispatch();
  const { register, form, formRef, validate } = useForm(
    {
      password: [
        required({ message: "Vui lòng nhập mật khẩu mới" }),
        min(6, "Mật khẩu phải có ít nhất 6 kí tự"),
      ],

      confirmPassword: [
        required({ message: "Vui lòng nhập lại mật khẩu" }),
        confirm("password", "Mật khẩu chưa chính xác"),
      ],
    },
    {
      dependencies: {
        password: ["confirmPassword"],
        confirmPassword: ["confirmPassword"],
      },
    }
  );

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        changePasswordByCodeAction({
          ...form,
          code,
          onSuccess: (user) =>
            toast.success(
              <p>
                Chào mừng{" "}
                <span className="text-[#34d399] font-bold">{user?.name}</span>{" "}
                quay trở lại
              </p>
            ),
        })
      );
    }
  };
  return (
    <section className="py-12">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mx-auto">
            {/* Card */}
            <div className="card card-lg mb-10 mb-md-0">
              <div className="card-body">
                {/* Heading */}
                <h6 className="mb-7 font-semibold uppercase text-center">
                  Thay đổi mật khẩu
                </h6>
                {/* Form */}
                <form
                  className="select-none"
                  autoComplete="off"
                  ref={formRef}
                  onSubmit={onChangePassword}
                >
                  <div className="row">
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        className="form-control form-control-sm"
                        id="password"
                        placeholder="New password *"
                        label="New password *"
                        type="password"
                        {...register("password")}
                      />
                    </div>
                    <div className="col-12">
                      {/* Email */}
                      <Field
                        className="form-control form-control-sm"
                        id="confirmPassword"
                        placeholder="Confirm password *"
                        label="Confirm password *"
                        type="password"
                        {...register("confirmPassword")}
                      />
                    </div>

                    <div className="col-6 mx-auto flex items-center justify-center">
                      {/* Button */}
                      <Button className="w-full" loading={_loading}>
                        Đăng nhập
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
