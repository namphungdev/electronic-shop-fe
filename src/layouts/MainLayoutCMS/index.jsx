import HeaderCMS from '@/components/HeaderCMS';
import Loading from '@/components/Loading';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayoutCMS = () => {
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
      <HeaderCMS />
      <Outlet />
    </Suspense>
  );
};
