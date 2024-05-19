import AddressCard from "@/components/AddressCard";
import AddressDrawer from "@/components/AddressDrawer";
import Button from "@/components/Button";
import EmptyText from "@/components/EmptyText";
import Field from "@/components/Field";
import PreCheckoutBoard from "@/components/PreCheckoutBoard";
import ProductCart from "@/components/ProductCart";
import Radio from "@/components/Radio";
import { PATH } from "@/config";
import { useCart } from "@/hooks/useCart";
import { useForm } from "@/hooks/useForm";
import useQuery from "@/hooks/useQuery";
import { cartService } from "@/services/cart.service";
import { userService } from "@/services/user.service";
import {
  getCartAction,
  setPreCheckoutDataAction,
  setPreCheckoutDataInitialAction,
} from "@/stores/cart/cartReducer";
import { onOpenDrawer } from "@/stores/drawerReducer";
import { regex, required } from "@/utils";
import currency from "@/utils/currency";
import handleError from "@/utils/handleError";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const addressRules = {
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
const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("money");
  const [note, setNote] = useState("");
  const { preCheckoutResponse: { shipping, listItems } = {}, preCheckoutData } =
    useCart();
  const [addressList, setAddressList] = useState([]);
  useEffect(() => {
    if (preCheckoutData?.listItems.length <= 0) {
      navigate(PATH.viewCart);
    }
  }, []);
  const { loading: loadingAddressList } = useQuery({
    queryFn: () => userService.getAddress("?default=true"),
    onSuccess: (res) => {
      if (res?.data) {
        setAddressList(res?.data);
      }
    },
  });
  const { data: { data: shippingMethodList = [] } = {} } = useQuery({
    queryFn: () => cartService.getShippingMethod(),
  });

  const {
    loading: loadingAddressDefault,
    fetchData: setAddressDefaultService,
  } = useQuery({
    enabled: false,
    queryFn: ({ params }) => userService.addAddress(...params),
  });

  const { loading: loadingCheckout, fetchData: checkoutService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => cartService.checkout(...params),
    onSuccess: (res) => {
      navigate(PATH.orderCompleted, {
        state: res?.data,
      });
      dispatch(getCartAction());
      dispatch(setPreCheckoutDataInitialAction());
    },
  });
  const { form, validate, register, formRef } = useForm(addressRules);

  const onPlaceOrder = async () => {
    let checkout;
    if (!addressList[0]) {
      if (validate()) {
        try {
          const res = await setAddressDefaultService({
            ...form,
            default: true,
          });
          setAddressList([res?.data]);

          checkout = await checkoutService({
            payment: { paymentMethod },
            promotionCode: preCheckoutData.promotionCode,
            listItems: preCheckoutData.listItems,
            shipping: {
              shippingMethod: preCheckoutData.shippingMethod,
              ...form,
            },
            ...(note && {
              note,
            }),
          });
        } catch (error) {
          handleError(error);
        }
      }
    } else {
      try {
        checkout = await checkoutService({
          payment: { paymentMethod },
          promotionCode: preCheckoutData.promotionCode,
          listItems: preCheckoutData.listItems,
          shipping: {
            shippingMethod: preCheckoutData.shippingMethod,
            ...addressList[0],
          },
          ...(note && {
            note,
          }),
        });
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <>
      <AddressDrawer
        selected={addressList?.[0]}
        updateAddressDefault={(e) => setAddressList([e])}
      />
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">
                    Home
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="shopping-cart.html">
                    Shopping Cart
                  </a>
                </li>
                <li className="breadcrumb-item active">Checkout</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              {/* Heading */}
              <h3 className="mb-4">Checkout</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-7">
              <div className="max-w-[300px] mb-5">
                <Button
                  onClick={() => navigate(PATH.viewCart)}
                  outline
                  className="normal-case"
                >
                  Quay trở lại giỏ hàng
                </Button>
              </div>
              {/* Form */}
              <div>
                {/* Heading */}
                <h6 className="mb-7">Shipping Details</h6>
                <div className="list-group list-group-lg list-group-flush mb-8">
                  <AddressCard
                    data={addressList}
                    empty={
                      <EmptyText>
                        Hiện tại bạn chưa cung cấp địa chỉ, vui lòng điền vào
                        form bên dưới
                      </EmptyText>
                    }
                    loading={loadingAddressList}
                    loadingCount={1}
                    className="!bg-white border p-6 relative"
                    hideAction
                    additionElement={
                      <>
                        <Button
                          className="absolute btn-xs normal-case"
                          outline
                          onClick={() => dispatch(onOpenDrawer("address"))}
                        >
                          Thay đổi địa chỉ khác
                        </Button>
                      </>
                    }
                  />
                </div>
                {/* Form */}
                {addressList?.length <= 0 && (
                  <Spin
                    spinning={loadingAddressDefault}
                    indicator={
                      <LoadingOutlined
                        style={{ color: "#000", fontSize: 28 }}
                      />
                    }
                  >
                    <form
                      className="row select-none mb-4"
                      autoComplete="off"
                      ref={formRef}
                    >
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
                          placeholder="Phone Number"
                          label="Phone Number *"
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
                          id="district"
                          placeholder="District"
                          label="District *"
                          {...register("district")}
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <Field
                          className="form-control"
                          id="companyName"
                          placeholder="Province / City"
                          label="Province / City *"
                          {...register("province")}
                        />
                      </div>
                      <div className="col-12">
                        <Field
                          className="form-control"
                          id="companyName"
                          placeholder="Address"
                          label="Address *"
                          {...register("address")}
                        />
                      </div>
                    </form>
                  </Spin>
                )}
              </div>
              {/* Heading */}
              <h6 className="mb-7">Shipping Method</h6>
              {/* Shipping details */}
              <div className="table-responsive mb-6">
                <table className="table table-bordered table-sm table-hover mb-0 select-none">
                  <tbody>
                    <Radio.Group
                      defaultValue={shipping?.shippingMethod}
                      onSetFilter={(method) =>
                        dispatch(
                          setPreCheckoutDataAction({
                            ...preCheckoutData,
                            shippingMethod: method,
                          })
                        )
                      }
                    >
                      {shippingMethodList.length > 0 &&
                        shippingMethodList.map((e) => (
                          <tr key={e.price}>
                            <td className="whitespace-nowrap place-items-center form-rating align-middle">
                              <Radio rating={e?.code}>{e.title}</Radio>
                            </td>
                            <td>{e.description}</td>
                            <td>{currency(e.price)}</td>
                          </tr>
                        ))}
                    </Radio.Group>
                  </tbody>
                </table>
              </div>
              {/* Heading */}
              <h6 className="mb-7">Payment</h6>
              {/* List group */}
              <Radio.Group
                defaultValue={paymentMethod}
                onSetFilter={(paymentMethod) => setPaymentMethod(paymentMethod)}
              >
                <div className="list-group list-group-sm mb-7 form-rating select-none">
                  <div className="list-group-item">
                    <Radio rating="card">
                      Credit Card{" "}
                      <img
                        className="ml-2"
                        src="./img/brands/color/cards.svg"
                        alt="..."
                      />
                    </Radio>
                  </div>
                  <div className="list-group-item">
                    <Radio rating="money">Trả tiền khi nhận hàng</Radio>
                  </div>
                </div>
              </Radio.Group>
              <textarea
                className="form-control form-control-sm mb-9 mb-md-0 font-size-xs"
                rows={5}
                placeholder="Order Notes (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
              {/* Heading */}
              <h6 className="mb-7">Order Items (3)</h6>
              {/* Divider */}
              <hr className="mt-7 mb-0" />
              {/* List group */}
              <div className="product-card">
                <div className="card-body">
                  <ul className="list-group list-group-lg list-group-flush-x">
                    {listItems?.map((e) => (
                      <ProductCart
                        key={e?.productId}
                        {...e}
                        hideInput
                        className="px-0"
                      />
                    ))}
                  </ul>
                </div>
              </div>
              {/* Card */}
              <PreCheckoutBoard hideAction />
              {/* Disclaimer */}
              <p className="mb-7 font-size-xs text-gray-500">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </p>
              {/* Button */}
              <Button
                className="btn-block normal-case"
                onClick={onPlaceOrder}
                loading={loadingAddressDefault || loadingCheckout}
              >
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section className="bg-light py-9">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-lg-0">
                {/* Icon */}
                <i className="fe fe-truck font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="heading-xxs mb-1">Free shipping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    From all orders over $100
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-lg-0">
                {/* Icon */}
                <i className="fe fe-repeat font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Free returns</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    Return money within 30 days
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-md-0">
                {/* Icon */}
                <i className="fe fe-lock font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Secure shopping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    You're in safe hands
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex">
                {/* Icon */}
                <i className="fe fe-tag font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Over 10,000 Styles</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    We have everything you need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
