import { GuestRoute } from "@/components/GuestRoute";
import { PrivateRoute } from "@/components/PrivateRoute";
import { PATH } from "@/config";
import { MainLayout } from "@/layouts/MainLayout";

import { delayFallback } from "@/utils";

import { lazy } from "react";
import profile from "./profile";
import { MainLayoutCMS } from "@/layouts/MainLayoutCMS";
import SignInCMS from "@/components/SignInCMS";
import { MainLayoutSignInCMS } from "@/layouts/MainLayoutSignInCMS";
import AddCategories from "@/pages/cms/quan-ly-danh-muc/create";
import EditCategoies from "@/pages/cms/quan-ly-danh-muc/edit";
const Home = lazy(() => delayFallback(import("@/pages")));
const Page404 = lazy(() => delayFallback(import("@/pages/404")));
const ProductPage = lazy(() => delayFallback(import("@/pages/product")));
const ProductDetailPage = lazy(() =>
  delayFallback(import("@/pages/product/[slug]"))
);
const AuthPage = lazy(() => delayFallback(import("@/pages/AuthPage")));
const ContactPage = lazy(() => delayFallback(import("@/pages/ContactPage")));
const Admin = lazy(() => delayFallback(import("@/pages/Admin")));
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
        path: PATH.about,
      },
      {
        element: <ContactPage />,
        path: PATH.contact,
      },
      {
        element: <Page404 />,
        path: PATH.error,
      },
      {
        element: <Page404 />,
        path: "*",
      },
    ],
  },

  {
    element: <MainLayoutCMS />,
    children: [
      {
        element: <Admin />,
        path: PATH.admin,
      },
      {
        element: <AddCategories />,
        path: PATH.categoriesAddCMS,
      },
      {
        element: <EditCategoies />,
        path: PATH.categoriesCMSDetail,
      },
    ]
  },

  {
    element: <GuestRoute redirect={PATH.admin} />,
    children: [
      {
        element: <SignInCMS />,
        path: PATH.authCMS,
      },
    ]
  },
];

