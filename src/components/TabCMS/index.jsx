import React, { useEffect, useState } from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { PATH } from '@/config';

const { Content, Sider } = Layout;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    overflow: hidden;
    background: #f5f5f9 !important;
  }

  .ant-layout-content {
    background-color: #f5f5f9 !important;
  } 

  .ant-layout {
    min-height: 100%;
    background-color: #f5f5f9 !important;
  }

  .ant-modal-body {
    padding: 24px;
  }

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
  }
`;

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const TabCMS = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedKey, setSelectedKey] = useState('1-1');

  useEffect(() => {
    if (user?.roleName === 'Admin') {
      navigate(PATH.tabCMS);
    } else {
      navigate(PATH.authCMS);
    }
  }, [user, navigate]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key); // Điều hướng tới route tương ứng với mục menu được chọn
  };

  const menuItems = [
    {
      key: '/admin/category-cms-management',
      icon: <UserOutlined />,
      label: 'Quản lý',
      children: [
        { key: '/admin/category-cms-management', label: 'Quản lý danh mục' },
        { key: '/admin/product-cms-management', label: 'Quản lý sản phẩm' },
      ],
    },

    {
      key: '/admin/category-cms-management',
      icon: <LaptopOutlined />,
      label: 'Quản lý danh mục',
      // children: [
      //   { key: '/admin/category-cms-management', label: 'Quản lý danh mục' },
      //   { key: '/admin/product-cms-management', label: 'Quản lý sản phẩm' },
      // ],
    },

    {
      key: '/admin/category-cms-management',
      icon: <LaptopOutlined />,
      label: 'Phân quyền người dùng',
      // children: [
      //   { key: '/admin/category-cms-management', label: 'Quản lý danh mục' },
      //   { key: '/admin/product-cms-management', label: 'Quản lý sản phẩm' },
      // ],
    },

  ];

  return (
    <>
      <GlobalStyle />
      <StyledLayout>
        <Layout
          style={{
            flex: 1,
            padding: '24px 0',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
              height: '100vh',
              position: 'fixed', 
              left: 0,
              top: 0,
              bottom: 0,
              // overflow: 'auto'
            }}
            width={200}
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <Link to={PATH.home}>
                <img
                  style={{ width: 'auto', height: '100px' }}
                  srcSet="/img/logos.png 2x"
                />
              </Link>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={[]}
              defaultOpenKeys={[]}
              style={{
                height: 'calc(100% - 150px)', // Điều chỉnh chiều cao để phù hợp với logo
                borderRight: 0,
              }}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content
            style={{
              marginLeft: 200, // Chừa khoảng trống cho Sider
              padding: '0 24px',
              minHeight: 200,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </StyledLayout>
    </>
  );
};

export default TabCMS;
