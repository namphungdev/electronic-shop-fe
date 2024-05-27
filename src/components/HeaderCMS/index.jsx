
import { PATH } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { avatarDefault, createItem } from '@/utils';
import { Dropdown } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutAction } from '@/stores/auth/authReducer';
import { toast } from 'react-toastify';

const HeaderNavs = [
  {
    to: PATH.home,
    nav: 'Trang chủ',
  },
  {
    to: PATH.products,
    nav: 'Sản phẩm',
  },
  {
    to: PATH.contact,
    nav: 'Liên hệ',
  },
  {
    to: PATH.about,
    nav: 'Thông tin',
  },
];

const HeaderCMS = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light  w-full z-10 bg-white shadow-lg">
          <div className="container flex justify-between items-center px-4">
            {/* Brand */}
            <Link className="navbar-brand" to={PATH.home}>
              <img
                style={{ width: '50px', height: 'auto' }}
                srcSet="/img/logos.png 2x"
              />
            </Link>
           
            <div className="navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav flex-row items-center">
                <li className="nav-item ml-lg-n4">
                  {user ? (
                    <Dropdown
                      placement="bottomRight"
                      arrow
                      trigger="click"
                      menu={createItem(
                        {
                          key: '3',
                          label: (
                            <span
                              className="user-link block cursor-pointer"
                              onClick={() => {
                                toast.dismiss();
                                dispatch(logoutAction());
                                toast.warn('Bạn đã đăng xuất khỏi tài khoản');
                              }}
                            >
                              Đăng xuất
                            </span>
                          ),
                        }
                      )}
                    >
                      <span className="nav-link cursor-pointer">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-400">
                          <img
                            src={user?.avatar || avatarDefault}
                            alt="ava"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </span>
                    </Dropdown>
                  ) : (
                    <Link className="nav-link" to={PATH.auth}>
                      <i className="fe fe-user" />
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  );
};

export default HeaderCMS;
