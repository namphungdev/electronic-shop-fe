import Breadcrumb from "@/components/Breadcrumb";
import Button from "@/components/Button";
import Field from "@/components/Field";
import PreCheckoutBoard from "@/components/PreCheckoutBoard";
import ProductCart from "@/components/ProductCart";
import ViewCartLoading from "@/components/ViewCartLoading";
import { PATH } from "@/config";
import { useCart } from "@/hooks/useCart";
import { useForm } from "@/hooks/useForm";
import {
  getPromotionAction,
  removePromotionAction,
} from "@/stores/cart/cartReducer";
import { required, shoppingImg } from "@/utils";
import handleError from "@/utils/handleError";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ViewCartPage = () => {
  const { cart, preCheckoutResponse } = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listItems = [] } = cart || {};
  const { form, validate, register, reset, formRef } = useForm({
    code: [required({ message: "Vui lòng nhập mã giảm giá" })],
  });

  const { loading } = useCart() || {};
  const [_loadingGetCart, setLoadingGetCart] = useState(
    loading?.getCart || false
  );
  const loadingPromotion = loading?.loadingPromotion || false;
  useEffect(() => {
    if (!loading?.getCart) {
      setLoadingGetCart(false);
    }
  }, [loading?.getCart]);

  const { promotion } = preCheckoutResponse;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(
        getPromotionAction({
          code: form?.code,
          onSuccess: () => {
            toast.success("Đã áp dụng mã giảm giá cho toàn bộ sản phẩm");
            reset();
          },
          onError: handleError,
        })
      );
    }
  };
  const onRemoveCoupon = () => {
    dispatch(
      removePromotionAction({
        onSuccess: () => toast.info("Đã xóa mã giảm giá"),
      })
    );
  };
  return (
    <>
      <div>
        {/* BREADCRUMB */}
        <nav className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Breadcrumb */}
                <Breadcrumb>
                  <Breadcrumb.Item to={PATH.home}>Trang chủ</Breadcrumb.Item>
                  <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </nav>
        {/* CONTENT */}
        <section className="pt-7 pb-12 select-none">
          {_loadingGetCart ? (
            <ViewCartLoading />
          ) : listItems?.length > 0 ? (
            <div className="container">
              <div className="row">
                <div className="col-12">
                  {/* Heading */}
                  <h3 className="mb-10 text-center">Shopping Cart</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-7">
                  {/* List group */}
                  <ul className="list-group list-group-lg list-group-flush-x mb-6">
                    {listItems.map((e) => (
                      <ProductCart key={e.productId} {...e} showCheckout />
                    ))}
                  </ul>
                  {/* Footer */}
                  <div className="row align-items-end justify-content-between mb-10 mb-md-0">
                    <div className="col-12 col-md-7">
                      {promotion ? (
                        <div className="promotion-code-card mb-5">
                          <div className="font-bold">
                            {promotion?.title?.replace("ã", "ả")}
                          </div>
                          <div className="text-sm">
                            {promotion?.description?.replace("ã", "ả")}
                          </div>
                          <i
                            className="fe fe-x close"
                            onClick={onRemoveCoupon}
                          />
                        </div>
                      ) : null}

                      {/* Coupon */}
                      <form
                        className="mb-7 mb-md-0 flex items-baseline gap-x-2"
                        onSubmit={onSubmit}
                        ref={formRef}
                      >
                        <Field
                          classNameGroup="!m-0 flex-1"
                          className="form-control form-control-sm"
                          id="cartCouponCode"
                          type="text"
                          placeholder="Nhập mã giảm giá*"
                          label="Coupon code:"
                          {...register("code")}
                        />
                        <Button
                          className="btn-sm mt-auto"
                          type="submit"
                          loading={loadingPromotion}
                        >
                          Apply
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
                  <PreCheckoutBoard />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 items-center animate-[fadeIn_1s]">
              <img width={300} srcSet={`${shoppingImg} 2x`} />
              <p className="mb-0">
                Không có sản phẩm nào trong giỏ hàng của bạn.
              </p>
              <Button
                className="min-w-[300px]"
                onClick={() => navigate(PATH.products)}
              >
                Tiếp tục mua sắm
              </Button>
            </div>
          )}
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
      </div>
    </>
  );
};

export default ViewCartPage;
