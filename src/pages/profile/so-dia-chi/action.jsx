import Button from "@/components/Button";
import Field from "@/components/Field";
import PortalTitle from "@/components/PortalTitle";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import {
  clearWaititngQueue,
  handleToastMessage,
  object,
  regex,
  required,
} from "@/utils";
import handleError from "@/utils/handleError";
import { Spin } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const rules = {
  fullName: [required({ message: "Vui lòng điền họ và tên" })],
  phone: [
    required({ message: "Vui lòng nhập số điện thoại" }),
    regex("phone", "Số điện thoại không hợp lệ"),
  ],
  email: [
    required({ message: "Vui lòng điền địa chỉ email" }),
    regex("email", "Nhập địa chỉ email chưa hợp lệ"),
  ],
  district: [required({ message: "Vui lòng nhập địa chỉ quận" })],
  province: [
    required({ message: "Vui lòng cho biết tỉnh thành đang sinh sống" }),
  ],
  address: [required({ message: "Vui lòng nhập số nhà" })],
};

const AddressActionPage = () => {
  const { id } = useParams();
  const { form, validate, register, setForm, formRef } = useForm(rules);
  const navigate = useNavigate();
  //===== getAddress =====
  const { loading: loadingDetailed, data: { data: addressDetailed } = {} } =
    useQuery({
      enabled: !!id,
      queryFn: () => userService.getAddressDetail(id),
      limitDuration: 800,
      onSuccess: (res) => setForm(res?.data),
      onError: (err) => {
        handleError(err);
        navigate(PATH.profile.address);
      },
    });

  //=========
  const { loading: loadingAction, fetchData: addressActionService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => {
      if (!id) {
        return userService.addAddress(...params);
      } else {
        return userService.editAddress(...params);
      }
    },
    limitDuration: 1000,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const checkUpdate = object.isEqual(form, addressDetailed);
      if (checkUpdate && !!id) {
        clearWaititngQueue();
        return toast.warn("Vui lòng điền thông tin mới để cập nhật");
      }
      const res = await handleToastMessage({
        promise: id
          ? addressActionService(id, form)
          : addressActionService(form),
        pending: !id
          ? "Thông tin địa chỉ đang được gửi"
          : "Đang cập nhật thông tin địa chỉ",
        success: !id
          ? "Đã thêm địa chỉ thành công"
          : "Đã cập nhật địa chỉ thành công",
      });
      if (res) navigate(PATH.profile.address);
    }
  };

  const isEditAddress = !!id;
  return (
    <>
      <PortalTitle selector={PROFILE_TITLE_ID}>
        {isEditAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
      </PortalTitle>
      <Spin spinning={loadingDetailed} size="large">
        <form
          action="post"
          onSubmit={onSubmit}
          autoComplete="off"
          className="select-none"
          ref={formRef}
        >
          <div className="row">
            <div className="col-12">
              <Field
                className="form-control"
                id="firstName"
                placeholder="Full Name"
                label="Full Name *"
                {...register("fullName")}
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                className="form-control"
                id="mobilePhone"
                type="tel"
                placeholder="Phone Number*"
                label="Phone Number*"
                {...register("phone")}
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                className="form-control"
                id="emailAddress"
                placeholder="Email Address"
                label="Email Address *"
                {...register("email")}
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                className="form-control"
                id="country"
                type="text"
                placeholder="District *"
                label="District *"
                {...register("district")}
              />
            </div>
            <div className="col-12 col-md-6">
              <Field
                className="form-control"
                id="companyName"
                placeholder="Province / City*"
                label="Province / City *"
                {...register("province")}
              />
            </div>
            <div className="col-12">
              <Field
                className="form-control"
                id="addressLineOne"
                type="text"
                placeholder="Address"
                label="Address *"
                {...register("address")}
              />
            </div>
            <div className="col-12">
              <Field
                {...register("default")}
                renderInput={({ value, _onChange, ...props }) => (
                  <div className="custom-control custom-checkbox mb-0">
                    <input
                      {...props}
                      type="checkbox"
                      className="custom-control-input"
                      id="defaultShippingAddress"
                      checked={value}
                      onChange={(e) => {
                        if (addressDetailed && addressDetailed.default) {
                          clearWaititngQueue();
                          toast.warn(
                            "Không thể sửa đổi trạng thái của địa chỉ mặc định"
                          );
                        } else {
                          _onChange({ target: { value: e.target.checked } });
                        }
                      }}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="defaultShippingAddress"
                    >
                      Default shipping address
                    </label>
                  </div>
                )}
              />
            </div>
          </div>
          <Button loading={loadingAction}>
            {isEditAddress ? "cập nhật" : "thêm địa chỉ"}
          </Button>
        </form>
      </Spin>
    </>
  );
};

export default AddressActionPage;
