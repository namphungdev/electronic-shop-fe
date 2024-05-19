import useEffectDidMount from "@/hooks/useEffectDidMount";
import { deleteCartAction, updateCartAction } from "@/stores/cart/cartReducer";
import { blockInvalidChar, cn } from "@/utils";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import PopConfirm from "../PopConfirm";

const InputQuantity = forwardRef(
  ({ quantity, productId, _loadingSpin, hideAction }, ref) => {
    const [openConfirm, setOpenConfirm] = useState(false);

    const [openConfirmQuantity, setOpenConfirmQuantity] = useState(false);

    let [_quantity, setQuantity] = useState(quantity);

    const dispatch = useDispatch();

    useEffectDidMount(() => {
      if (_quantity !== quantity) {
        setQuantity(quantity);
      }
    }, [quantity]); //khi thêm sản phẩm đã có từ bên ngoài cần update _quantity

    useImperativeHandle(ref, () => _quantity, [_quantity]);

    const handleChangeQuantity = (val) => (_quantity) => {
      if (typeof val === "number" && val < 1) return;
      if (val === "delete") {
        return dispatch(deleteCartAction(productId));
      } else if (val === "blur") {
        if (!_quantity) return setQuantity(quantity);

        if (_quantity !== quantity && !hideAction) {
          dispatch(
            updateCartAction({
              id: productId,
              data: {
                quantity: _quantity,
              },
            })
          );
        }
      } else {
        setQuantity(val);
        if (hideAction) return;
        dispatch(
          updateCartAction({
            id: productId,
            data: {
              quantity: val,
            },
          })
        );
      }
    };

    const handleChangeInput = (e) => {
      if (/^0/.test(e.target.value)) {
        e.target.value = e.target.value.replace(/^0/, "");
      }

      setQuantity(+e.target.value?.trim() || "");
    };
    return (
      <div className="d-flex align-items-center justify-between w-full">
        {/* Select */}
        <div className="btn-group btn-quantity select-none">
          <PopConfirm
            title="Thông báo"
            open={openConfirmQuantity}
            onOpenChange={(status) => setOpenConfirmQuantity(status)}
            trigger="click"
            description={
              <p className="text-base m-0">
                Bạn có muốn xóa{" "}
                <span className="font-semibold">"sản phẩm"</span> này?
              </p>
            }
            disabled={hideAction ? hideAction : _quantity > 1}
            okText="Xóa"
            placement="bottomRight"
            loading={_loadingSpin}
            overlayClassName="max-w-[300px]"
            onConfirm={() => {
              handleChangeQuantity("delete")();
              setOpenConfirmQuantity(false);
            }}
          >
            <span
              className={cn(
                "outline-none border-none cursor-pointer p-[10px] flex justify-center items-center"
              )}
              onClick={handleChangeQuantity(_quantity - 1)}
            >
              -
            </span>
          </PopConfirm>
          <input
            value={_quantity}
            className="border !border-y-transparent"
            onChange={handleChangeInput}
            onKeyDown={blockInvalidChar}
            onBlur={(e) => handleChangeQuantity("blur")(e.target.value)}
            type="number"
          />

          <span
            className={cn(
              "outline-none border-none cursor-pointer p-[10px] flex justify-center items-center"
            )}
            disabled
            onClick={handleChangeQuantity(_quantity + 1)}
          >
            +
          </span>
        </div>
        {/* Remove */}
        {!hideAction && (
          <PopConfirm
            title="Thông báo"
            onOpenChange={(status) => setOpenConfirm(status)}
            trigger="click"
            open={openConfirm}
            description={
              <p className="text-base m-0">
                Bạn có muốn xóa{" "}
                <span className="font-semibold">"sản phẩm"</span> này?
              </p>
            }
            okText="Xóa"
            placement="bottomRight"
            overlayClassName="max-w-[300px]"
            loading={_loadingSpin}
            onConfirm={() => {
              // dispatch(deleteCartAction(productId));
              handleChangeQuantity("delete")();
              setOpenConfirm(false);
            }}
          >
            <span className="font-size-xs text-gray-400 ml-auto flex items-center gap-x-1 select-none cursor-pointer">
              <i className="fe fe-trash" /> Xóa
            </span>
          </PopConfirm>
        )}
      </div>
    );
  }
);

export default InputQuantity;
