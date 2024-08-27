import { CATEGORY_API_HHB, PATH } from '@/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { onOpenDrawer } from '@/stores/drawerReducer';
import { Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SearchDrawer from '../SearchDrawer';
import { useDispatch } from 'react-redux';
import CartDrawer from '../CartDrawer';
const { SubMenu } = Menu;
import 'antd/dist/reset.css';
import useQuery from '@/hooks/useQuery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { productTiles } from '@/services/product.service';
import axios from 'axios';
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
    to: PATH.camera,
    nav: 'TẤM ỐP NHỰA',
    submenu: []
  },
  {
    to: PATH.contact,
    nav: 'LIÊN HỆ',
  }
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const isHomepage = location.pathname === '/';
  const [headerNavs, setHeaderNavs] = useState(HeaderNavs);
  const [productCodes, setProductCodes] = useState({
    gachOpLatCode: null,
    thietBiVeSinhCode: null,
    tamOpNhuaCode: null,
  });
  const [activeNav, setActiveNav] = useState(location.pathname); 

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
            item.to = `${PATH.products}/${gachOpLat.productTypeCode}`;
          }
          break;
        case 'THIẾT BỊ VỆ SINH':
          const thietBiVeSinh = productTypeList.find(product => product.productTypeName === 'THIẾT BỊ VỆ SINH');
          if (thietBiVeSinh) {
            item.to = `${PATH.products}/${thietBiVeSinh.productTypeCode}`;
          }
          break;
        case 'TẤM ỐP NHỰA':
          const tamOpNhua = productTypeList.find(product => product.productTypeName === 'TẤM ỐP NHỰA');
          if (tamOpNhua) {
            item.to = `${PATH.products}/${tamOpNhua.productTypeCode}`;
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

  // useEffect(() => {
  //   const updatedHeaderNavs = HeaderNavs.map(item => {
  //     switch (item.nav) {
  //       case 'GẠCH ỐP LÁT':
  //         const gachOpLat = productTypeList.find(product => product.productTypeName === 'GẠCH ỐP LÁT');
  //         if (gachOpLat) {
  //           item.to = `${PATH.products}/${gachOpLat.productTypeCode}`;
  //         }
  //         break;
  //       case 'THIẾT BỊ VỆ SINH':
  //         const thietBiVeSinh = productTypeList.find(product => product.productTypeName === 'THIẾT BỊ VỆ SINH');
  //         if (thietBiVeSinh) {
  //           item.to = `${PATH.products}/${thietBiVeSinh.productTypeCode}`;
  //         }
  //         break;
  //       case 'TẤM ỐP NHỰA':
  //         const tamOpNhua = productTypeList.find(product => product.productTypeName === 'TẤM ỐP NHỰA');
  //         if (tamOpNhua) {
  //           item.to = `${PATH.products}/${tamOpNhua.productTypeCode}`;
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //     return item;
  //   });
  
  //   // Update headerNavs only if they have changed
  //   if (JSON.stringify(headerNavs) !== JSON.stringify(updatedHeaderNavs)) {
  //     setHeaderNavs(updatedHeaderNavs);
  //   }
  
  //   const gachOpLat = productTypeList?.find(item => item.productTypeName === 'GẠCH ỐP LÁT')?.productTypeCode || null;
  //   const thietBiVeSinh = productTypeList?.find(item => item.productTypeName === 'THIẾT BỊ VỆ SINH')?.productTypeCode || null;
  //   const tamOpNhua = productTypeList?.find(item => item.productTypeName === 'TẤM ỐP NHỰA')?.productTypeCode || null;
  
  //   if (
  //     gachOpLat !== productCodes.gachOpLatCode ||
  //     thietBiVeSinh !== productCodes.thietBiVeSinhCode ||
  //     tamOpNhua !== productCodes.tamOpNhuaCode
  //   ) {
  //     setProductCodes({
  //       gachOpLatCode: gachOpLat,
  //       thietBiVeSinhCode: thietBiVeSinh,
  //       tamOpNhuaCode: tamOpNhua,
  //     });
  //   }
  // }, [productTypeList, headerNavs, productCodes]);

    async function fetchCategoryList(productTypeCode, navName) {
    if (productTypeCode != null) {
      try {
        const response = await axios.get(`${CATEGORY_API_HHB}/get-web-product-category-list?ProductTypeCode=${productTypeCode}`);
        const categories = response.data.data.productCategory;
        const submenus = categories.map(category => ({
          to: `${PATH.products}/${category.productCategoryCode}`,
          nav: category.productCategoryName,
          submenu: category.subProductCategories.length > 0
            ? category.subProductCategories.map(sub => ({
                to: `${PATH.products}/${sub.subProductCategoryCode}`,
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

  useEffect(() => {
    if (isHomepage) {
      const handleScroll = () => {
        const header = document.querySelector('.navbar');
        const submenus = document.querySelectorAll('.ant-menu-submenu-popup');

        submenus.forEach((submenu) => {
          submenu.style.top = `${header.offsetHeight}px`;
        });

        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setScrolled(false);
    }
  }, [isHomepage]);

  const handleMenuClick = (item) => {
    setActiveNav(item.to);

    const matchingProduct = productTypeList.find(
      (product) => product.productTypeName === item.nav
    );

    if (matchingProduct) {
      navigate(`${PATH.products}/${matchingProduct.productTypeCode}`);
    } else {
      navigate(item.to);
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

  return (
    <>
      <SearchDrawer />
      <CartDrawer />
      <div>
        <nav className={`navbar navbar-expand-lg fixed top-0 left-0 w-full z-10 mb-0 p-2 ${isHomepage ? (scrolled ? 'scrolled' : 'homepage') : ''}`}>
          <div className="container">
            <Link className="navbar-brand" to={PATH.home}>
              <img
                style={{ width: '75px', height: 'auto', borderRadius: '5px' }}
                srcSet="/img/backup-logo.png 2x"
              />
            </Link>
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
            <div className="navbar-collapse flex justify-end" id="navbarCollapse">
              <Menu mode="horizontal">
                {renderMenuItems(headerNavs)}
              </Menu>
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
              </ul>
            </div>
          </div>
        </nav>

        <div style={{ marginTop: '100px' }}></div>
      </div>
    </>
  );
};

export default Header;