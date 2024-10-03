import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ, faBan } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { CATEGORY_API_HHB, PATH, PRODUCT_API_HHB } from '@/config';
import { Pagination, Spin } from 'antd';
import axios from 'axios';
import useScrollTop from '@/hooks/useScrollTop';
import Skeleton from '@/components/Skeleton';
import createArray from '@/utils/createArray';
import { productTiles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import './style.css';

const optionSort = [
  {
    value: 1,
    title: 'Sản phẩm mới nhất',
  },
  {
    value: 2,
    title: 'Giá thấp đến cao',
  },
  {
    value: 3,
    title: 'Giá cao đến thấp',
  },
];

const ProductPage = () => {
  useScrollTop()

  const location = useLocation();
  const [codeParam, setCodeParam] = useState('');
  const [typeParam, setTypeParam] = useState('');
  const [productList, setProductList] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [itemPro, setItemPro] = useState([]);
  const [order, setOrder] = useState('id');
  const [sort, setSort] = useState('desc');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showNoProductsMessage, setShowNoProductsMessage] = useState(false);

  useEffect(() => {
    if (location.pathname) {
      const pathParts = location.pathname.split('/');
      if (pathParts.length > 2) {
        const typeValue = pathParts[2].split('-')[0];
        const isValidNumber = !isNaN(Number(typeValue));

        setTypeParam(isValidNumber ? typeValue : '1');

        if (isValidNumber) {
          setCodeParam(location.pathname.slice(12));
        } else {
          setCodeParam(location.pathname.slice(10));
        }
      }
    }
  }, [location.pathname]);

  const param = {
    keyword: '',
    pageIndex: currentPage,
    pageSize: 6,
    code: codeParam,
    type: typeParam,
    order: order,
    sort: sort,
  };

  async function fetchCategoryList() {
    if (codeParam && typeParam) {
      setLoading(true);
      setProductList([]);
      setShowNoProductsMessage(false);
      try {
        const response = await axios.post(`${PRODUCT_API_HHB}/web-get-product-list`, param);
        const products = response.data.data.data || [];
        setProductList(products);
        setTotalPages(response.data.data.totalPages || 1);
      } catch (error) {
        console.error('There has been a problem with your axios request:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  const param2 = {
    code: codeParam,
    type: typeParam
  }

  const { data: { data: products = [] } = {} } = useQuery({
    enabled: false,
    queryFn: ({ param2 }) => productTiles.getBreakcumb(...param2),
  });

  async function fetchBreadcrumb() {
    if (codeParam && typeParam) {
      setLoading(true);
      try {
        const response = await axios.post(`${CATEGORY_API_HHB}/get-web-breakcumb-list`, param2);
        setBreadcrumb(response.data.data.breakCumb || []);
        setItemPro(response.data.data.productCategory || []);
      } catch (error) {
        console.error('There has been a problem with your axios request:', error);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (codeParam && typeParam) {
      fetchCategoryList();
    }
  }, [codeParam, typeParam, order, sort, currentPage]);

  useEffect(() => {
    fetchBreadcrumb();
    setCurrentPage(1)
  }, [codeParam, typeParam]);

  useEffect(() => {
    let timeoutId;
    if (!loading && productList.length === 0) {
      timeoutId = setTimeout(() => {
        setShowNoProductsMessage(true);
      }, 2000); // 2-second delay before showing "no products" message
    } else {
      setShowNoProductsMessage(false); // Reset when productList is populated
    }

    return () => {
      clearTimeout(timeoutId); // Clear timeout when component unmounts or productList updates
    };
  }, [loading, productList]);

  const handleSortChange = (e) => {
    const selectedValue = Number(e.target.value);
    if (selectedValue === 1) {
      setOrder('Id');
      setSort('desc');
    } else if (selectedValue === 2) {
      setOrder('Price');
      setSort('asc');
    } else if (selectedValue === 3) {
      setOrder('Price');
      setSort('desc');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toTitleCase = (str) => {
    if (!str) return '';
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <nav className="py-3 bg-[#f5f5f5] mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {!loading ? (
                <Breadcrumb>
                  <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                  {breadcrumb && breadcrumb.map((item, id) => (
                    <Breadcrumb.Item key={id}>{toTitleCase(item.name)}</Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              ) : (
                <Skeleton width={577} height={18} borderRadius={4} />
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="layout-collection">
        <div className="container">
          {loading ? (
            <LoadingDetail />
          ) : (
            <div className='row'>
              <div className='col-12 col-title'>
                <h2 className='mb-4 inline-block font-bold text-3xl uppercase font-oswald relative pb-2 product-h1-custom'>
                  {toTitleCase(breadcrumb[breadcrumb.length - 1]?.name)}
                </h2>
              </div>
              <div className='block-collection col-sm-12 col-12 col-md-12'>
                <div className='col-list-cate'>
                  <div className="tab-ul">
                    <div className="menu-list">
                      {itemPro && itemPro.map((item, id) => (
                        <div className='cate-item' key={id}>
                          {toTitleCase(item?.name)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ml-3">
                  <div className="select-container">
                    <select className="custom-select custom-select-xs" onChange={handleSortChange}>
                      {optionSort.map((e) => (
                        <option value={e?.value} key={e.value}>
                          {e.title}
                        </option>
                      ))}
                    </select>
                    <FontAwesomeIcon icon={faArrowDownAZ} className="select-icon" />
                  </div>
                </div>
              </div>
              <div className={`products-view my-5 col-sm-12 col-12 col-md-12 ${productList?.length === 0 ? 'no-products' : ''}`}>
                {productList && productList.length > 0 ? (
                  <div className="product-grid">
                    {productList.map((product) => (
                      <div key={product.id} className="product-detail">
                        <div className="products-view-card">
                          <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                            <img style={{ height: 'auto' }} srcSet={product.images[0].base_url} alt={product.name} />
                          </Link>
                          <div className="product-card-content">
                            <h3 className="product-card-title">{product.name}</h3>
                            <div className="product-box">
                              <span className="product-box-price">
                                {Number(product.discountedPrice).toLocaleString('vi-VN')}đ
                              </span>
                              <span className="product-compare-price">{Number(product.price).toLocaleString('vi-VN')}đ</span>
                            </div>
                            <div className="product-button">
                              <Link to={PATH.contact} className="btn-product-contact">
                                Liên hệ
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-products-message">
                    {/* <FontAwesomeIcon icon={faBan} className="mr-2" />
      Không có sản phẩm nào được tìm thấy */}
                    <img src="/img/not-found.png" alt="" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const LoadingDetail = () => {
  return (
    <div className="layout-collection">
      <div className="container">
        <div className="row">
          {/* Title Skeleton */}
          <div className="col-12 col-title">
            <Skeleton width={200} height={30} className="mb-3" />
          </div>

          {/* Categories Skeleton */}
          <div className="block-collection col-sm-12 col-12 col-md-12">
            <div className="col-list-cate">
              <div className="tab-ul">
                <div className="menu-list">
                  {createArray(4).map((_, id) => (
                    <Skeleton key={id} width={100} height={30} className="cate-item mb-3" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sort Select Skeleton */}
            <div className="ml-3">
              <div className="select-container">
                <Skeleton width={150} height={40} />
              </div>
            </div>
          </div>

          {/* Product List Skeleton */}
          <div className="products-view my-5 col-sm-12 col-12 col-md-12">
            <div className="container row">
              <div className="product-detail">
                {createArray(6).map((_, id) => (
                  <div key={id} className="products-view-card mb-5">
                    <Skeleton width={200} height={250} className="mb-3" />

                    {/* Product Info Skeleton */}
                    <div className="product-card-content">
                      <Skeleton width={150} height={30} className="mb-2" />
                      <div className="product-box mb-2">
                        <Skeleton width={80} height={20} />
                        <Skeleton width={80} height={20} className="ml-3" />
                      </div>
                      <Skeleton width={100} height={30} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
