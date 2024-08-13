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
import TabCMS from "@/components/TabCMS";
import CategoryManagement from "@/pages/cms/quan-ly-danh-muc";
import AddCategories from "@/pages/cms/quan-ly-danh-muc/create";
import EditCategories from "@/pages/cms/quan-ly-danh-muc/edit";
import ProductManagement from "@/pages/cms/quan-ly-san-pham";
import AddProducts from "@/pages/cms/quan-ly-san-pham/create";
import EditProducts from "@/pages/cms/quan-ly-san-pham/edit";
import UserManagement from "@/pages/cms/quan-ly-nguoi-dung";
import PermissionUsers from "@/pages/cms/phan-quyen-nguoi-dung";
import Camera from "@/pages/Camera";
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
    path: "/",
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
        element: <Camera />,
        path: PATH.camera,
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
    path: "/admin",
    children: [
      { element: <Admin />, path: PATH.admin },
      { element: <CategoryManagement />, path: PATH.categoriesManagement },
      { element: <AddCategories />, path: PATH.categoriesAddCMS },
      { element: <EditCategories />, path: PATH.categoriesCMSDetail },
      { element: <ProductManagement />, path: PATH.productsManagement },
      { element: <AddProducts />, path: PATH.productsAddCMS },
      { element: <EditProducts />, path: PATH.productsCMSDetail },
      { element: <UserManagement />, path: PATH.usersManagement },
      { element: <PermissionUsers />, path: PATH.permissionUsers },
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

