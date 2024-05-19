import { PATH } from "@/config";
import { useCart } from "@/hooks/useCart";
import currency from "@/utils/currency";
import { Spin } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";

const PreCheckoutBoard = ({ hideAction = false }) => {
  const {
    preCheckoutResponse,
    loading,
    preCheckoutData: { listItems = [] } = {},
  } = useCart();
  const { total, subTotal, tax, promotion, shipping } = preCheckoutResponse;
  const navigate = useNavigate();
  const _loadingSpin = loading["checkout-board"] || false;
  return (
    <>
      <Spin spinning={_loadingSpin} size="large">
        {/* Total */}
        <div className="product-card card mb-7 bg-light">
          <div className="card-body">
            <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
              <li className="list-group-item d-flex">
                <span>Subtotal</span>{" "}
                <span className="ml-auto font-size-sm">
                  {subTotal ? currency(subTotal) : 0}
                </span>
              </li>
              <li className="list-group-item d-flex">
                <span>Promotion</span>{" "}
                <span className="ml-auto font-size-sm">
                  {promotion?.discount
                    ? `- ${currency(promotion?.discount)}`
                    : 0}
                </span>
              </li>
              {hideAction && (
                <li className="list-group-item d-flex">
                  <span>Shipping</span>{" "}
                  <span className="ml-auto font-size-sm">
                    {currency(shipping?.shippingPrice)}
                  </span>
                </li>
              )}
              <li className="list-group-item d-flex">
                <span>Tax</span>{" "}
                <span className="ml-auto font-size-sm">
                  {tax ? currency(tax) : 0}
                </span>
              </li>
              <li className="list-group-item d-flex font-size-lg font-weight-bold">
                <span className="font-bold">Total</span>{" "}
                <span className="ml-auto font-size-sm">
                  {total ? currency(total) : 0}
                </span>
              </li>
              {!hideAction && (
                <li className="list-group-item font-size-sm text-center text-gray-500">
                  Giá vận chuyển sẽ được tính khi checkout *
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* Button */}
        {!hideAction && (
          <>
            <Button
              className="mb-2 w-full"
              disabled={listItems.length <= 0}
              onClick={() => navigate(PATH.checkout)}
            >
              Proceed to Checkout
            </Button>
            {/* Link */}
            <Link
              className="btn btn-link btn-sm px-0 text-body"
              to={PATH.products}
            >
              <i className="fe fe-arrow-left mr-2" /> Continue Shopping
            </Link>
          </>
        )}
      </Spin>
    </>
  );
};

export default PreCheckoutBoard;
