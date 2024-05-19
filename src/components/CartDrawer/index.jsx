import { PATH } from "@/config";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import useWindowSize from "@/hooks/useWindowSize";
import { onCloseDrawer } from "@/stores/drawerReducer";
import { cartImg, cn, logInImg, shoppingImg } from "@/utils";
import currency from "@/utils/currency";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";
import Portal from "../Portal";
import ProductCart from "../ProductCart";

const ListStyle = styled.ul`
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    width: 5px;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: #ccc;
    border-radius: 10px;
  }
  -webkit-overflow-scrolling: touch;
`;
const ContentStyle = styled.div`
  overflow-y: hidden !important;
`;

const CartDrawer = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const size = useWindowSize();
  const [height, setHeight] = useState();
  const headerRef = useRef();
  const footerRef = useRef();

  const { open } = useSelector((state) => state.drawer.cart);
  const onClose = () => dispatch(onCloseDrawer("cart"));
  const { cart } = useCart();
  useLayoutEffect(() => {
    if (user && cart) {
      const headerHeight = headerRef.current.scrollHeight;
      const footerHeight = footerRef.current.scrollHeight;
      const bodyHeight = size[1] - headerHeight - footerHeight;
      setHeight(bodyHeight);
    }
  }, [size[1], user, cart]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("hide");
    } else {
      document.body.classList.remove("hide");
    }
  }, [open]);

  const { listItems = [], subTotal, totalQuantity } = cart || {};
  return (
    <Portal
      open={open}
      containerClassName={`fixed z-50 inset-0 ${
        open ? "visible" : "invisible"
      }`}
      overlay
      onClose={onClose}
      containerStyled={{ transition: "all 0.2s ease-in-out" }}
      contentClassName={cn(
        "modal-dialog modal-dialog-vertical w-full absolute right-0 top-0 bottom-0 h-max",
        { "opacity-100": open },
        { "opacity-0": !open }
      )}
      contentStyle={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "all 0.3s ease-out",
      }}
    >
      <ContentStyle
        className="modal-content select-none"
        style={{ height: "100vh" }}
      >
        {user && cart ? (
          <>
            <button
              type="button"
              className="close !outline-none"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <i className="fe fe-x" aria-hidden="true" />
            </button>

            <div
              className="modal-header line-height-fixed font-size-lg"
              ref={headerRef}
            >
              <strong className="mx-auto">
                Your Cart ({totalQuantity ? totalQuantity : 0})
              </strong>
            </div>

            {totalQuantity <= 0 ? (
              <div className="flex flex-col items-center px-5 pt-2 animate-[fadeIn_1s]">
                <div className="w-full flex justify-center">
                  <img
                    srcSet={`${shoppingImg} 2x`}
                    alt="..."
                    className="h-[180px] object-cover"
                  />
                </div>
                <span className="mt-5 italic">
                  Hiện tại giỏ hàng bạn đang trống
                </span>
                <Button
                  onClick={() => {
                    navigate(PATH.products);
                    dispatch(onCloseDrawer("cart"));
                  }}
                  className="mt-5 w-full normal-case italic"
                >
                  Tiếp tục mua sắm
                </Button>
              </div>
            ) : (
              <ListStyle
                className="list-group list-group-lg list-group-flush"
                style={{ height }}
              >
                {listItems?.map((e) => (
                  <ProductCart key={e.productId} {...e.product} {...e} />
                ))}
              </ListStyle>
            )}

            {/* Footer */}
            <div
              ref={footerRef}
              className={cn({
                hidden: totalQuantity <= 0,
                visible: totalQuantity > 0,
              })}
            >
              <div className="modal-footer line-height-fixed font-size-sm bg-light mt-auto">
                <strong>Tổng cộng:</strong>{" "}
                <strong className="ml-auto">{currency(subTotal)}</strong>
              </div>
              <div className="modal-body">
                <Button
                  className="btn-block"
                  outline
                  onClick={() => {
                    navigate(PATH.viewCart);
                    onClose();
                  }}
                >
                  View Cart
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header line-height-fixed font-size-lg justify-center items-center">
              <img srcSet={`${cartImg} 2x`} alt="cart" className="h-[50px]" />
            </div>
            <div className="mt-6 p-5">
              <h2 className="text-center text-[20px] uppercase font-semibold italic">
                Vui lòng đăng nhập để xem giỏ hàng
              </h2>
              <div className="h-[150px] flex justify-center items-center mt-10">
                <img
                  srcSet={`${logInImg} 2x`}
                  alt=""
                  className="h-full object-cover"
                />
              </div>

              <Button
                className="w-full mt-10"
                onClick={() => {
                  navigate(PATH.auth);
                  onClose();
                }}
              >
                Đăng nhập
              </Button>
            </div>
          </>
        )}
      </ContentStyle>
    </Portal>
  );
};

export default CartDrawer;
