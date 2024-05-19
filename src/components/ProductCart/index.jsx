import { PATH } from "@/config";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/utils";
import currency from "@/utils/currency";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { generatePath, Link } from "react-router-dom";
import Checkout from "../Checkout";
import InputQuantity from "../InputQuantity";
const ProductCart = ({
  hideInput = false,
  showCheckout = false,
  price: priceTotal,
  quantity,
  productId,
  product: { thumbnail_url, name, price, real_price, slug },
  ...props
}) => {
  const { loading } = useCart();
  const _loadingSpin = loading?.[productId] || false;
  return (
    <Spin
      spinning={_loadingSpin}
      indicator={<LoadingOutlined style={{ color: "#000", fontSize: 28 }} />}
    >
      <li
        className={cn(
          "list-group-item animate-[fadeIn_1s] flex items-center gap-x-5 last:border-b-0",
          props?.className
        )}
      >
        {showCheckout ? <Checkout productId={productId} /> : null}
        <div className="row align-items-center flex-nowrap w-full">
          <div className="w-[120px] flex-shrink-0" title={name}>
            {/* Image */}
            <Link
              to={generatePath(PATH.productDetail, {
                slug,
              })}
            >
              <img className="img-fluid" src={thumbnail_url} alt="..." />
            </Link>
          </div>
          <div className="flex-grow px-2 w-full">
            {/* Title */}
            <p className="font-size-sm mb-6">
              <Link
                className="text-body line-clamp-3 font-semibold"
                to={generatePath(PATH.productDetail, {
                  slug,
                })}
                title={name}
              >
                {name}
              </Link>{" "}
              <br />
              <span className="card-product-price">
                {real_price < price ? (
                  <>
                    <span className="sale text-primary !text-xl">
                      {currency(real_price)}
                    </span>
                    <span className="text-muted !text-xs line-through ml-1 inline-block">
                      {currency(price)}
                    </span>
                  </>
                ) : (
                  <span className="sale text-primary !text-xl">
                    {currency(real_price || price)}
                  </span>
                )}
              </span>
              {hideInput ? (
                <span className="mt-5 block">
                  x {quantity} ={" "}
                  <span className="font-semibold">{currency(priceTotal)}</span>
                </span>
              ) : null}
            </p>

            {/*Footer */}

            {!hideInput ? (
              <InputQuantity
                _loadingSpin={_loadingSpin}
                productId={productId}
                quantity={quantity}
              />
            ) : null}
          </div>
        </div>
      </li>
    </Spin>
  );
};

export default ProductCart;
