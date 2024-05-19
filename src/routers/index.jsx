import { GuestRoute } from "@/components/GuestRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config";
import { MainLayout } from "@/layouts/MainLayout";

import { delayFallback } from "@/utils";

import { lazy } from "react";
import profile from "./profile";
const Home = lazy(() => delayFallback(import("@/pages")));
const Page404 = lazy(() => delayFallback(import("@/pages/404")));
const ProductPage = lazy(() => delayFallback(import("@/pages/product")));
const ProductDetailPage = lazy(() =>
  delayFallback(import("@/pages/product/[slug]"))
);
const AuthPage = lazy(() => delayFallback(import("@/pages/AuthPage")));
const ContactPage = lazy(() => delayFallback(import("@/pages/ContactPage")));
const FaqPage = lazy(() => delayFallback(import("@/pages/FaqPage")));
const ResetPasswordPage = lazy(() =>
  delayFallback(import("@/pages/ResetPasswordPage"))
);
const ViewCartPage = lazy(() => delayFallback(import("@/pages/ViewCartPage")));

const ShippingPage = lazy(() => delayFallback(import("@/pages/ShippingPage")));
const CheckoutPage = lazy(() => delayFallback(import("@/pages/CheckoutPage")));
const OrderCompletedPage = lazy(() =>
  delayFallback(import("@/pages/OrderCompletedPage"), 1500)
);
export const routers = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        index: true,
      },
      {
        element: <PrivateRoute redirect={PATH.auth} />,
        children: [
          profile,
          {
            element: <ViewCartPage />,
            path: PATH.viewCart,
          },
          {
            element: <CheckoutPage />,
            path: PATH.checkout,
          },
          {
            element: <OrderCompletedPage />,
            path: PATH.orderCompleted,
          },
        ],
      },
      {
        element: <GuestRoute redirect={PATH.profile.index} />,
        children: [
          {
            element: <AuthPage />,
            path: PATH.auth,
          },
          {
            element: <ResetPasswordPage />,
            path: PATH.resetPassword,
          },
        ],
      },
      {
        element: <ProductPage />,
        path: PATH.products,
      },
      {
        element: <ProductPage />,
        path: PATH.category,
      },
      {
        element: <ProductDetailPage />,
        path: PATH.productDetail,
      },
      {
        element: <ShippingPage />,
        path: PATH.shipping,
      },
      {
        element: <FaqPage />,
        path: PATH.faq,
      },
      {
        element: <ContactPage />,
        path: PATH.contact,
      },
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },
];
