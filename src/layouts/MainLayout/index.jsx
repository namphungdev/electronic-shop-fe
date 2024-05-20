import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router258-dom';

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

      <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="Facebook"
            className="w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform"
            srcSet="/img/messenger.jpg"
          />
        </a>
        <a href="https://zalo.me" target="_blank" rel="noopener noreferrer">
          <img
            srcSet="/img/zalo.jpg"
            alt="Zalo"
            className="w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform"
          />
        </a>
      </div>
    </Suspense>
  );
};
