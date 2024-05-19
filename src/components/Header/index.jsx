import { PATH } from '@/config';
import { useAuth } from '@/hooks/useAuth';
import { onOpenDrawer } from '@/stores/drawerReducer';
import { avatarDefault, cn, createItem } from '@/utils';
import { Badge, Dropdown, Popover } from 'antd';
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SearchDrawer from '../SearchDrawer';
import { useDispatch } from 'react-redux';
import { logoutAction } from '@/stores/auth/authReducer';
import { CheckCircleFilled } from '@ant-design/icons';
import Button from '../Button';
import CartDrawer from '../CartDrawer';
import { useCart } from '@/hooks/useCart';
import { onSetOpenCart } from '@/stores/cart/cartReducer';
import { toast } from 'react-toastify';
import { useTranslate } from '../TranslateProvider';

const HeaderNavs = [
  {
    to: PATH.home,
    nav: 'Trang chủ',
  },
  {
    to: PATH.products,
    nav: 'Sản phẩm',
  },
  // {
  //   to: '/laptop-thiet-bi-it/1846',
  //   nav: 'Laptop',
  // },
  // {
  //   to: '/dien-thoai-may-tinh-bang/1789',
  //   nav: 'Điện thoại',
  // },
  // {
  //   to: `${PATH.products}?sort=discount_rate.desc`,
  //   nav: 'Sản phẩm khuyến mãi',
  // },
  {
    to: PATH.contact,
    nav: 'Contact',
  },
  {
    to: PATH.about,
    nav: 'About',
  },
];
const LANG = {
  vi: 'Tiếng Việt',
  eng: 'English',
  chi: 'China',
};
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, open } = useCart();
  const { t, setLang, lang } = useTranslate();
  return (
    <>
      <SearchDrawer />
      <CartDrawer />
      <div>
        {/* NAVBAR */}

        {/* NAVBAR */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            {/* Brand */}
            <Link className="navbar-brand" to={PATH.home}>
              <img srcSet="/img/logo.png 2x" />
            </Link>
            {/* Toggler */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            {/* Collapse */}
            <div className="navbar-collapse" id="navbarCollapse">
              {/* Nav */}
              <ul className="navbar-nav mx-auto">
                {HeaderNavs.map((e, id) => (
                  <li className="nav-item" key={id}>
                    <NavLink
                      className={({ isActive }) =>
                        cn('nav-link', { '!text-[#ff6f61]': isActive })
                      }
                      to={e.to}
                    >
                      {t(e.nav)}
                    </NavLink>
                  </li>
                ))}
              </ul>
              {/* Nav */}
              <ul className="navbar-nav flex-row items-center">
                <li className="nav-item">
                  <span
                    className="nav-link cursor-pointer"
                    data-toggle="modal"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(onOpenDrawer('search'));
                    }}
                  >
                    <i className="fe fe-search" />
                  </span>
                </li>

                <li className="nav-item ml-lg-n4">
                  <Link className="nav-link" to={PATH.profile.wishList}>
                    <i className="fe fe-heart" />
                  </Link>
                </li>
                <Popover
                  open={open}
                  onOpenChange={(status) => {
                    if (!status) {
                      dispatch(onSetOpenCart(status));
                    }
                  }}
                  trigger="click"
                  placement="bottomRight"
                  overlayClassName="max-w-[300px]"
                  content={
                    <>
                      <div className="flex items-center gap-x-2">
                        <CheckCircleFilled className="text-green-500" />
                        <h5 className="text-base m-0 font-bold">
                          Thêm sản phẩm thành công
                        </h5>
                      </div>
                      <Button
                        className="mt-5 btn-xs text-sm"
                        onClick={() => {
                          navigate(PATH.viewCart);
                          dispatch(onSetOpenCart(false));
                        }}
                      >
                        ĐI ĐẾN GIỎ HÀNG VÀ THANH TOÁN
                      </Button>
                    </>
                  }
                >
                  <li
                    className="nav-item ml-lg-n4"
                    onClick={() => dispatch(onOpenDrawer('cart'))}
                  >
                    <a className="nav-link cursor-pointer" data-toggle="modal">
                      <Badge
                        count={user && cart && cart?.totalQuantity}
                        size="small"
                        offset={[0, 1]}
                      >
                        <i className="fe fe-shopping-cart" />
                      </Badge>
                    </a>
                  </li>
                </Popover>
                <li className="nav-item ml-lg-n4">
                  {user ? (
                    <Dropdown
                      placement="bottomRight"
                      arrow
                      trigger="click"
                      menu={createItem(
                        {
                          key: '1',
                          label: (
                            <Link
                              className="user-link block"
                              to={PATH.profile.index}
                            >
                              Thông tin cá nhân
                            </Link>
                          ),
                        },
                        {
                          key: '2',
                          label: (
                            <Link
                              className="user-link block"
                              to={PATH.profile.order}
                            >
                              Đơn hàng của tôi
                            </Link>
                          ),
                        },
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
        {/* PROMO */}
        {/* <div className="py-3 bg-dark bg-pattern mb-4">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="text-center text-white">
                  <span className="heading-xxs letter-spacing-xl">
                    ⚡️ Happy Holiday Deals on Everything ⚡️
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Header;
