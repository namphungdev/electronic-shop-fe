import React, { useEffect } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/config';

const { Content, Sider } = Layout;

const items2 = [UserOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const GlobalStyle = createGlobalStyle`
  html, body, #root {
    height: 100%;
    margin: 0;
    // overflow: hidden; /* Prevent scrolling */
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
  console.log('user 47', user);

  useEffect(() => {
    if(user?.roleName == 'Admin') {
      console.log('đây là admin - redirect qua admin');
      
    } else{
      console.log('không phải admin - redirect qua đăng nhập');
      navigate(PATH.authCMS)
    }
  }, [])

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
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{
                height: '100%',
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            CMS ở đây
          </Content>
        </Layout>
      </StyledLayout>
    </>
  );
};

export default Admin;
