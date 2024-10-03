import HeaderCMS from '@/components/HeaderCMS';
import Loading from '@/components/Loading';
import TabCMS from '@/components/TabCMS';
import React, { Suspense } from 'react';

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
      <TabCMS />
    </Suspense>
  );
};
