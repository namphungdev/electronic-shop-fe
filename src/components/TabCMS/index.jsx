import React, { useEffect, useState } from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate, Outlet } from 'react-router-dom';
import { PATH } from '@/config';

const { Content, Sider } = Layout;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    overflow: hidden
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
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['/admin/category-cms-management']}
              defaultOpenKeys={['/admin/category-cms-management', '/admin/user-management']}
              style={{
                height: '100%',
              }}
              items={menuItems}
              onClick={handleMenuClick}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
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
