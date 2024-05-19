import Button from "@/components/Button";
import Field from "@/components/Field";
import PortalTitle from "@/components/PortalTitle";
import Radio from "@/components/Radio";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import {
  clearWaititngQueue,
  cn,
  handleToastMessage,
  object,
  required,
} from "@/utils";
import handleError from "@/utils/handleError";
import { DatePicker, Spin, Tooltip } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const rules = {
  cardNumber: [required()],
  cardName: [required()],
  expired: [required()],
  cvv: [required()],
};
const PaymentActionPage = () => {
  const { id } = useParams();
  const [step, setStep] = useState(!!id ? 1 : 0);
  const navigate = useNavigate();
  const { register, validate, form, formRef, setForm } = useForm(rules, {
    initialValue: {
      type: "card",
    },
  });

  //=====get info===
  const {
    loading: loadingPaymentDetails,
    data: { data: paymentDetails = {} } = {},
  } = useQuery({
    enabled: !!id,
    queryFn: () => userService.getPaymentDetail(id),
    onSuccess: (res) => setForm(res?.data),
    onError: (err) => {
      handleError(err);
      navigate(PATH.profile.payment);
    },
  });

  const { fetchData: paymentActionService, loading: loadingPaymentAction } =
    useQuery({
      enabled: false,
      queryFn: ({ params }) => {
        if (!!id) {
          return userService.editPayment(...params);
        } else {
          return userService.addPayment(...params);
        }
      },
      limitDuration: 1000,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const checkUpdate = object.isEqual(form, paymentDetails);

    if (!!id && checkUpdate) {
      clearWaititngQueue();
      toast.warn("Vui lòng điền thông tin mới để cập nhật");
      return;
    }

    if (validate()) {
      try {
        await handleToastMessage({
          promise: !!id
            ? paymentActionService(id, form)
            : paymentActionService(form),
          pending: !!id
            ? "Đang cập nhật sổ thanh toán"
            : "Đang thêm số thanh toán mới",
          success: !!id
            ? "Đã sửa sổ thanh toán thành công"
            : "Đã thêm sổ thanh toán thành công",
        });
        navigate(PATH.profile.payment);
      } catch (error) {
        console.log(
          "%cerror action.jsx line:98 ",
          "color: red; display: block; width: 100%;",
          error
        );
      }
    }
  };

  return (
    <>
      <PortalTitle selector={PROFILE_TITLE_ID}>
        {!!id ? "CẬP NHẬT SỔ THANH TOÁN" : "THÊM SỔ THANH TOÁN"}
      </PortalTitle>
      <Helmet>
        {" "}
        <title>Add / Edit payment</title>
      </Helmet>
      {step === 0 ? (
        <Field
          {...register("type")}
          renderInput={({ value, onChange }) => (
            <Radio.Group
              defaultValue={value}
              onSetFilter={(value) => onChange(value)}
            >
              <Radio.Payment imgSrc="/img/brands/color/cards.svg" type="card">
                I want to add Debit / Credit Card
              </Radio.Payment>
              <Radio.Payment
                imgSrc="/img/brands/color/paypal.svg"
                type="paypall"
              >
                I want to add PayPal
              </Radio.Payment>
              <button className="btn btn-dark" onClick={() => setStep(1)}>
                Continue <i className="fe fe-arrow-right ml-2" />
              </button>
            </Radio.Group>
          )}
        ></Field>
      ) : (
        <Spin spinning={loadingPaymentDetails}>
          <form ref={formRef} onSubmit={onSubmit} className="select-none">
            <div className="row">
              <div className="col-12 col-md-6">
                <Field
                  className="form-control"
                  id="cardNumber"
                  placeholder="Card Number"
                  label="Card Number *"
                  {...register("cardNumber")}
                />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  className="form-control"
                  id="nameOnCard"
                  placeholder="Name on Card"
                  label="Name on Card *"
                  {...register("cardName")}
                />
              </div>
              <div className="col-12">{/* Label */}</div>
              <div className="col-12 col-md-6">
                <Field
                  label="Expiry Time *"
                  className="custom-select"
                  id="expire-time"
                  {...register("expired")}
                  renderInput={({
                    value,
                    onChange,
                    error,
                    className,
                    ...props
                  }) => (
                    <DatePicker
                      {...props}
                      picker="month"
                      format="MM/YYYY"
                      placeholder="Expiration of your card"
                      className={cn(className, "date-picker", { error: error })}
                      style={{ borderColor: error && "red" }}
                      value={value ? dayjs(value, "MM/YYYY") : undefined}
                      onChange={(_, dateString) => onChange(dateString)}
                    />
                  )}
                />
              </div>
              <div className="col-12 col-md-6">
                <Field
                  className="form-control"
                  id="paymentCardCVV"
                  placeholder="CVV *"
                  label="CVV *"
                  {...register("cvv")}
                  renderInput={({ error, className, onChange, ...props }) => (
                    <div className="input-group input-group-merge relative">
                      <input
                        {...props}
                        onChange={(e) => onChange(e.target.value)}
                        style={{ borderColor: error && "red" }}
                        className={cn(className, "!border-r", {
                          "placeholder:text-red-500": error,
                        })}
                      />
                      <div className="flex absolute items-center right-0 top-0 bottom-0 z-10 px-6">
                        <Tooltip
                          title="The CVV Number on your credit card or debit
                            card is a 3 digit number on VISA, MasterCard and
                            Discover branded credit and debit cards."
                          placement="topRight"
                          color="#fff"
                          overlayClassName="!top-[430px] tooltip-white"
                          overlayInnerStyle={{
                            color: "#000",
                          }}
                        >
                          <i
                            className={cn("fe fe-help-circle", {
                              "text-red-500": error,
                            })}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  )}
                />
              </div>
              <div className="col-12">
                <Field
                  {...register("default")}
                  renderInput={({ value, onChange, ...props }) => (
                    <div className="custom-control custom-checkbox mb-3">
                      <input
                        {...props}
                        checked={value}
                        onChange={(e) => {
                          if (paymentDetails && paymentDetails.default) {
                            clearWaititngQueue();
                            toast.warn(
                              "Không thể sửa đổi trạng thái của số thanh toán mặc định"
                            );
                          } else {
                            onChange(e.target.checked);
                          }
                        }}
                        type="checkbox"
                        className="custom-control-input"
                        id="defaultPaymentMethod"
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="defaultPaymentMethod"
                      >
                        Default payment method
                      </label>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* Button */}
            <Button loading={loadingPaymentAction}>
              {!!id ? "THÊM SỐ THANH TOÁN" : "CẬP NHẬT SỔ THANH TOÁN"}
            </Button>
          </form>
        </Spin>
      )}
    </>
  );
};

export default PaymentActionPage;
