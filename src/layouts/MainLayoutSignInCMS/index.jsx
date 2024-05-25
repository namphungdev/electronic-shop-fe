import Loading from '@/components/Loading';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayoutSignInCMS = () => {
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
      <Outlet />
    </Suspense>
  );
};
