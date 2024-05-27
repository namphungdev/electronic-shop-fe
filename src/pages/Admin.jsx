import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';
import CategoryManagement from './cms/quan-ly-danh-muc';

const { Content, Sider } = Layout;

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
  }

  .ant-layout {
    min-height: 100%;
  }
`;

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const Admin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedKey, setSelectedKey] = useState('1');

  useEffect(() => {
    if (user?.roleName === 'Admin') {
      console.log('Admin user - access granted');
      navigate(PATH.admin);
    } else {
      console.log('Non-admin user - redirecting to login');
      navigate(PATH.authCMS);
    }
  }, [user, navigate]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1-1':
        return <CategoryManagement />;
      case '1-2':
        return <div>Content for Quản lý sản phẩm</div>;
      case '2-1':
        return <div>Content for Quản lý người dùng</div>;
      case '2-2':
        return <div>Content for Phân quyền người dùng</div>;
      default:
        return <CategoryManagement />;
    }
  };

  const menuItems = [
    {
      key: 'sub1',
      icon: <UserOutlined />,
      label: 'Quản lý',
      children: [
        { key: '1-1', label: 'Quản lý danh mục' },
        { key: '1-2', label: 'Quản lý sản phẩm' },
      ],
    },
    {
      key: 'sub2',
      icon: <LaptopOutlined />,
      label: 'Hệ thống',
      children: [
        { key: '2-1', label: 'Quản lý người dùng' },
        { key: '2-2', label: 'Phân quyền người dùng' },
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
              defaultSelectedKeys={['1-1']}
              defaultOpenKeys={['sub1', 'sub2']}
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
            {renderContent()}
          </Content>
        </Layout>
      </StyledLayout>
    </>
  );
};

export default Admin;
