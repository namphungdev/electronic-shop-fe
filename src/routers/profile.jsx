import { lazy } from "react";
import ProfileLayout from "@/layouts/ProfileLayout";
import { PATH } from "@/config";
import { delayFallback } from "@/utils";

const ProfilePage = lazy(() => delayFallback(import("@/pages/profile")));
const AddressPage = lazy(() =>
  delayFallback(import("@/pages/profile/so-dia-chi"))
);
const AddressActionPage = lazy(() =>
  delayFallback(import("@/pages/profile/so-dia-chi/action"))
);
const OrderPage = lazy(() => delayFallback(import("@/pages/profile/donhang")));
const OrderDetailPage = lazy(() =>
  delayFallback(import("@/pages/profile/donhang/[id]"))
);
const PaymentPage = lazy(() =>
  delayFallback(import("@/pages/profile/so-thanh-toan"))
);
const PaymentActionPage = lazy(() =>
  delayFallback(import("@/pages/profile/so-thanh-toan/action"))
);
const WishlistPage = lazy(() =>
  delayFallback(import("@/pages/profile/wishlist"))
);

const profile = {
  element: <ProfileLayout />,
  path: PATH.profile.index,
  children: [
    {
      element: <ProfilePage />,
      index: true,
    },
    {
      element: <OrderPage />,
      path: PATH.profile.order,
    },
    {
      element: <OrderDetailPage />,
      path: PATH.profile.orderDetail,
    },
    {
      element: <WishlistPage />,
      path: PATH.profile.wishList,
    },
    {
      element: <AddressPage />,
      path: PATH.profile.address,
    },
    {
      element: <AddressActionPage />,
      path: PATH.profile.newAddress,
    },
    {
      element: <AddressActionPage />,
      path: PATH.profile.editAddress,
    },

    {
      element: <PaymentPage />,
      path: PATH.profile.payment,
    },
    {
      element: <PaymentActionPage />,
      path: PATH.profile.newPayment,
    },
    {
      element: <PaymentActionPage />,
      path: PATH.profile.editPayment,
    },
  ],
};
export default profile;
