import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <Suspense
      fallback={
        <>
          <div className="loading-spin">
            <Loading />
          </div>
        </>
      }
    >
      <Header />
      <Outlet />
      <Footer />
    </Suspense>
  );
};
