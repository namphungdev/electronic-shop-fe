import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
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
  }

  .ant-layout {
    min-height: 100%;
  }
`;

const StyledLayout = styled(Layout)`
  height: 100%;
`;

const AdminContent = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
    
      const navigate = useNavigate();
      const { user } = useAuth();
      const [selectedKey, setSelectedKey] = useState('1');
    
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
    
      const renderContent = () => {
        switch (selectedKey) {
          case '1-1':
            return <div>Content for Quản lý danh muc</div>;
          case '1-2':
            return <div>Content for Quản lý sản phẩm</div>;
          case '2-1':
            return <div>Content for Quản lý người dùng</div>;
          case '2-2':
            return <div>Content for Phân quyền người dùng</div>;
          default:
            return <div>Default</div>;
        }
      };
    
      const menuItems = [
        {
          key: '/admin/category-management',
          icon: <UserOutlined />,
          label: 'Quản lý',
          children: [
            { key: '/admin/category-management', label: 'Quản lý danh mục' },
            { key: '/admin/product-management', label: 'Quản lý sản phẩm' },
          ],
        },
        {
          key: '/admin/user-management',
          icon: <LaptopOutlined />,
          label: 'Hệ thống',
          children: [
            { key: '/admin/user-management', label: 'Quản lý người dùng' },
            { key: '/admin/user-permission', label: 'Phân quyền người dùng' },
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

export default AdminContent;
