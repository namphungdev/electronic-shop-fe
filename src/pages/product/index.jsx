import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CATEGORY_API_HHB, PATH, PRODUCT_API_HHB } from '@/config';
import { Pagination, Spin } from 'antd';
import axios from 'axios';
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

  const handleSortChange = (e) => {
    const selectedValue = Number(e.target.value);
    if (selectedValue === 1) {
      setOrder('Id');
      setSort('desc');
    } else if (selectedValue === 2) {
      setOrder('Price');
      setSort('desc');
    } else if (selectedValue === 3) {
      setOrder('Price');
      setSort('asc');
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
              <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                {breadcrumb && breadcrumb.map((item, id) => (
                  <Breadcrumb.Item key={id}>{toTitleCase(item.name)}</Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <div className="layout-collection">
        <div className="container">
          <div className='row'>
            <div className='col-12 col-title'>
              <h1>{toTitleCase(breadcrumb[0]?.name)}</h1>
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
            <div
              className={`products-view my-5 col-sm-12 col-12 col-md-12 ${productList.length === 0 ? 'no-products' : ''}`}
            >
              <div className="container row">
                <div className='product-detail'>
                  {loading ? (
                    <div className="loading-container">
                      <Spin size="large" />
                    </div>
                  ) : productList.length > 0 ? (
                    productList.map((product) => (
                      <div key={product.id} className='products-view-card'>
                        <Link className='navbar-brand' to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                          <img
                            style={{ height: 'auto' }}
                            srcSet={product.images[0].base_url}
                            alt={product.name}
                          />
                        </Link>
                        <div className="product-card-content">
                          <h3 className="product-card-title">{product.name}</h3>
                          <div className='product-box'>
                            <span className='product-box-price'>
                              {Number(product.discountedPrice).toLocaleString('vi-VN')}đ
                            </span>
                            <span className='product-compare-price'>
                              {Number(product.price).toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                          <div className='product-button'>
                            <Link to={PATH.contact} className='btn-product-contact'>
                              Liên hệ
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-products-message">
                      Không có sản phẩm nào được tìm thấy
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {productList.length > 0 ?
        <div className="pagination-wrapper">
          <Pagination
            align="center"
            current={currentPage}
            total={totalPages * 6}
            pageSize={6}
            onChange={handlePageChange}
          />
        </div> : null
      }
    </>
  );
};

export default ProductPage;
