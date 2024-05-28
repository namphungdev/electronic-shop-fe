import HeaderCMS from '@/components/HeaderCMS';
import Loading from '@/components/Loading';
import TabCMS from '@/components/TabCMS';
import { PATH } from '@/config';
import CategoryManagement from '@/pages/cms/quan-ly-danh-muc';
import ProductManagement from '@/pages/cms/quan-ly-san-pham';
import React, { Suspense } from 'react';
import { Outlet, Routes, Route } from 'react-router-dom';

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
      <Routes>
        {/* <Route path="admin" element={<TabCMS />}>
          <Route path="/admin/category-cms-management" element={<CategoryManagement />} />
          <Route path="/admin/category-cms-management" element={<div>Content for Quản lý sản phẩm</div>} />
          <Route path="/admin/category-cms-management" element={<div>Content for Quản lý người dùng</div>} />
          <Route path="/admin/category-cms-management" element={<div>Content for Phân quyền người dùng</div>} />
          <Route path="" element={<div>Mặc định</div>} /> 
        </Route> */}

          <Route path="admin1" element={<Outlet />}>
          <Route element={<CategoryManagement />} />
          <Route element={<ProductManagement />} />
          <Route path="user-management" element={<div>Content for Quản lý người dùng</div>} />
          <Route path="permission-management" element={<div>Content for Phân quyền người dùng</div>} />
          {/* <Route path="" element={<div>Mặc định</div>} />  */}
        </Route>
      </Routes>
      <TabCMS />
    </Suspense>
  );
};
