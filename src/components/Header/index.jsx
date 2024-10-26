import { CATEGORY_API_HHB, PATH } from '@/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Drawer, Button } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
const { SubMenu } = Menu;
import 'antd/dist/reset.css';
import useQuery from '@/hooks/useQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faLocationDot, faMagnifyingGlass, faPhoneVolume, faBars } from '@fortawesome/free-solid-svg-icons';
import { productTiles } from '@/services/product.service';
import axios from 'axios';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';
import "./style.css"

const HeaderNavs = [
  {
    to: PATH.home,
    nav: 'TRANG CHỦ',
  },
  {
    to: PATH.about,
    nav: 'GIỚI THIỆU',
  },
  {
    to: PATH.products,
    nav: 'GẠCH ỐP LÁT',
    submenu: []
  },
  {
    to: PATH.category,
    nav: 'THIẾT BỊ VỆ SINH',
    submenu: []
  },
  {
    to: PATH.faq,
    nav: 'TẤM ỐP NHỰA',
    submenu: []
  },
  {
    to: PATH.contact,
    nav: 'LIÊN HỆ',
  }
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [headerNavs, setHeaderNavs] = useState(HeaderNavs);
  const [activeNav, setActiveNav] = useState(location.pathname);
  const [productCodes, setProductCodes] = useState({
    gachOpLatCode: null,
    thietBiVeSinhCode: null,
    tamOpNhuaCode: null,
  });

  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const searchRef = useRef(null);

  const toggleSearch = () => {
    setSearchVisible(prevState => !prevState);
  };

  // Hàm xử lý khi click bên ngoài
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchVisible(false);
    }
  };

  useEffect(() => {
    // Thêm sự kiện click vào document
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup sự kiện khi component bị hủy
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const {
    data: { data: productTypeList = [] } = {}
  } = useQuery({
    queryKey: `get-product-type-list`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: () =>
      productTiles.getProductTypeList(),
  });

  useEffect(() => {
    const updatedHeaderNavs = HeaderNavs.map(item => {
      switch (item.nav) {
        case 'GẠCH ỐP LÁT':
          const gachOpLat = productTypeList.find(product => product.productTypeName === 'GẠCH ỐP LÁT');
          if (gachOpLat) {
            item.to = `${PATH.products}/${gachOpLat?.productTypeName}-${gachOpLat.productTypeCode}`;
          }
          break;
        case 'THIẾT BỊ VỆ SINH':
          const thietBiVeSinh = productTypeList.find(product => product.productTypeName === 'THIẾT BỊ VỆ SINH');
          if (thietBiVeSinh) {
            item.to = `${PATH.products}/${thietBiVeSinh?.type}-${thietBiVeSinh.productTypeCode}`;
          }
          break;
        case 'TẤM ỐP NHỰA':
          const tamOpNhua = productTypeList.find(product => product.productTypeName === 'TẤM ỐP NHỰA');
          if (tamOpNhua) {
            item.to = `${PATH.products}/${tamOpNhua?.type}-${tamOpNhua.productTypeCode}`;
          }
          break;
        default:
          break;
      }
      return item;
    });

    setHeaderNavs(updatedHeaderNavs);

    const gachOpLat = productTypeList?.find(item => item.productTypeName === 'GẠCH ỐP LÁT');
    const thietBiVeSinh = productTypeList?.find(item => item.productTypeName === 'THIẾT BỊ VỆ SINH');
    const tamOpNhua = productTypeList?.find(item => item.productTypeName === 'TẤM ỐP NHỰA');

    if (gachOpLat && thietBiVeSinh && tamOpNhua) {
      setProductCodes({
        gachOpLatCode: gachOpLat.productTypeCode,
        thietBiVeSinhCode: thietBiVeSinh.productTypeCode,
        tamOpNhuaCode: tamOpNhua.productTypeCode,
      });
    }
  }, [productTypeList]);

  async function fetchCategoryList(productTypeCode, navName) {
    if (productTypeCode != null) {
      try {
        const response = await axios.get(`${CATEGORY_API_HHB}/get-web-product-category-list?ProductTypeCode=${productTypeCode}`);
        const categories = response.data.data.productCategory;
        const submenus = categories.map(category => ({
          to: `${PATH.products}/${category.type}-${category.productCategoryCode}`,
          nav: category.productCategoryName,
          submenu: category.subProductCategories.length > 0
            ? category.subProductCategories.map(sub => ({
              to: `${PATH.products}/${sub.type}-${sub.subProductCategoryCode}`,
              nav: sub.subProductCategoryName,
            }))
            : null,
        }));

        setHeaderNavs(prevNavs =>
          prevNavs.map(item => {
            if (item.nav === navName) {
              return { ...item, submenu: submenus };
            }
            return item;
          })
        );
      } catch (error) {
        console.error('There has been a problem with your axios request:', error);
      }
    }
  }

  useEffect(() => {
    fetchCategoryList(productCodes.gachOpLatCode, 'GẠCH ỐP LÁT');
    fetchCategoryList(productCodes.thietBiVeSinhCode, 'THIẾT BỊ VỆ SINH');
    fetchCategoryList(productCodes.tamOpNhuaCode, 'TẤM ỐP NHỰA');
  }, [productCodes]);

  const handleMenuClick = (item) => {
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768; // Kiểm tra màn hình nhỏ hơn 768px

    setActiveNav(item.to);

    // Kiểm tra nếu có submenu và ở màn hình nhỏ
    if (isMobile && item.submenu) {
      // Ngăn điều hướng và mở submenu
      return;
    }

    const matchingProduct = productTypeList.find(
      (product) => product.productTypeName === item.nav
    );

    if (matchingProduct) {
      navigate(`${PATH.products}/${matchingProduct.productTypeCode}`);
    } else {
      navigate(item.to);
    }

    // Đóng Drawer trên mobile khi click vào một mục menu
    if (isMobile) {
      onClose(); // Ẩn menu Drawer
    }
  };

  const renderMenuItems = (items) => {
    return items.map((item) => {
      const isActive = activeNav === item.to;
      const hasSubmenu = item.submenu && ['GẠCH ỐP LÁT', 'THIẾT BỊ VỆ SINH', 'TẤM ỐP NHỰA'].includes(item.nav);

      return item.submenu ? (
        <SubMenu
          key={item.to}
          title={
            <span style={{ color: isActive ? 'white' : 'black' }}>
              {item.nav} {hasSubmenu && <FontAwesomeIcon size="xs" icon={faChevronDown} />}
            </span>
          }
          onTitleClick={() => handleMenuClick(item)}
        >
          {renderMenuItems(item.submenu)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.to} onClick={() => handleMenuClick(item)}>
          <NavLink
            to={item.to}
            style={{ color: isActive ? 'white' : 'black' }}
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            {item.nav}
          </NavLink>
        </Menu.Item>
      );
    });
  };

  // Scroll giữ lại bottom-bar
  useEffect(() => {
    const bottomBar = document.querySelector('.bottom-bar');

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const triggerHeight = 100; // Điều chỉnh chiều cao này theo ý bạn

      if (scrollY > triggerHeight) {
        bottomBar.classList.add('sticky-bottom-bar');
      } else {
        bottomBar.classList.remove('sticky-bottom-bar');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`${PATH.search}?keyword=${searchValue}`);
    }
  };

  return (
    <>
      <header className='header-mega'>
        <div className='header header-mege header-lg'>
          <div className="mid-bar navbar-nav">
            <div className="container mid-bar-content">
              <div class="desktop logo-wrapper">
                <div id="logo">
                  <a href="/">
                    <img
                      src="/img/image-special.png"
                      alt="Logo"
                    />
                  </a>
                </div>
                <h1 className='header-title'>
                  GẠCH 315
                </h1>
              </div>

              <div className="header-right flex-class">
                <div className="header-search">
                  <div className="search-modal-overlay">
                    <div className="search-modal-container">
                      <div
                        className="search-modal-content content-desktop"
                      >
                        <input
                          type="text"
                          className={`search-input ${searchVisible ? 'show' : ''}`}
                          ref={searchRef}
                          placeholder="Tìm kiếm"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <SearchOutlined className='search-icon' color='#ba9344' />
                      </div>
                      {searchVisible && (
                        <div
                          className="search-modal-content content-mobile"
                        >
                          <input
                            type="text"
                            className={`search-input ${searchVisible ? 'show' : ''}`}
                            ref={searchRef}
                            placeholder="Tìm kiếm"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                          />
                          <SearchOutlined className='search-icon' color='#ba9344' />
                        </div>
                      )
                      }

                      <SearchOutlined
                        className='search-icon'
                        color='#ba9344'
                        onClick={toggleSearch}
                      />
                    </div>
                  </div>
                </div>

                <MenuOutlined className="menu-bars" color='#ba9344' onClick={showDrawer} />

                <div className='contact-phone' style={{ marginRight: '15px' }}>
                  <FontAwesomeIcon style={{ color: '#ba9344', marginRight: '8px' }} icon={faPhoneVolume} />
                  <span>0911 315 315</span>
                </div>
                <div className='contact-address'>
                  <FontAwesomeIcon style={{ color: '#ba9344', marginRight: '8px' }} icon={faLocationDot} />
                  <span>1151 Lê Đức Thọ, P13, Quận Gò Vấp</span>
                </div>
              </div>
            </div>
          </div>

          <div className='bottom-bar navbar-nav'>
            <div className='container' style={{ padding: 0 }}>
              <Menu mode="horizontal" className="menu-bar" style={{ backgroundColor: '#ba9344' }}>
                {renderMenuItems(headerNavs)}
              </Menu>
            </div>
          </div>

          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            visible={visible}
          >
            <Menu mode="inline">
              {renderMenuItems(headerNavs)}
            </Menu>
          </Drawer>
        </div>
      </header>
    </>
  );
};

export default Header;


{/* <Button className="menu-bars" type="primary" onClick={showDrawer}>
                  <FontAwesomeIcon style={{ color: '#fff' }} icon={faBars} />
                </Button> */}