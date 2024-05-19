import { useCart } from "@/hooks/useCart";
import { setPreCheckoutDataAction } from "@/stores/cart/cartReducer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Checkout = ({ productId }) => {
  const { preCheckoutData } = useCart();
  const dispatch = useDispatch();
  
  const [checked, setChecked] = useState(
    preCheckoutData?.listItems?.includes(productId) || false
  );
  const handlePreCheckout = () => {
    setChecked(!checked);

    let listItems = [...preCheckoutData?.listItems];

    if (listItems?.includes(productId)) {
      listItems = listItems.filter((e) => e !== productId);
    } else {
      listItems.push(productId);
    }
    dispatch(setPreCheckoutDataAction({ ...preCheckoutData, listItems }));
  };
  return (
    <div className="custom-control custom-checkbox">
      <input
        className="custom-control-input"
        id={`${productId}`}
        type="checkbox"
        checked={checked}
        onChange={handlePreCheckout}
      />
      <label className="custom-control-label" htmlFor={`${productId}`} />
    </div>
  );
};

export default Checkout;
