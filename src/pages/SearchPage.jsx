import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { PATH, PRODUCT_API_HHB } from '@/config';
import './product/style.css';
import { Spin } from 'antd';

const useSearchKeyword = () => {
  const location = useLocation();

  // Lấy keyword từ query string
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');

  // Giải mã các ký tự mã hóa (nếu có)
  return keyword ? decodeURIComponent(keyword) : '';
};

const SearchPage = () => {
  const keyword = useSearchKeyword()
  const [loading, setLoading] = useState(true);
  const [dataSearch, setDataSearch] = useState('')

  const param = {
    keyword: keyword,
    pageIndex: 1,
    pageSize: 20,
    code: null,
    type: 0,
    order: 'id',
    sort: 'desc'
  }

  async function fetchSearchList() {
    setLoading(true);
    try {
      const response = await axios.post(`${PRODUCT_API_HHB}/web-get-product-list`, param);
      setDataSearch(response?.data?.data?.data)
    } catch (error) {
      console.error('There has been a problem with your axios request:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSearchList()
  }, [keyword])

  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-3 bg-[#f5f5f5] mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Breadcrumb>
                <Breadcrumb.Item to={PATH.home}>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Tìm kiếm</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <div className='text-center text-3xl mb-3'>
        Kết quả tìm kiếm: {keyword}
      </div>

      <section className="py-5 layout-collection">
        <div className="container">
          <div className="">
            {loading ? (
              <div className="loading-container">
                <Spin size='large' />
              </div>
            ) : (
              <>
                <div className="product-row">
                  {dataSearch && dataSearch.length > 0 ? (
                    dataSearch.map((product) => (
                      <div key={product.id} className="product-card">
                        <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                          {product.discountedPrice == null ? null : (
                            product.percentDiscount ? (
                              <div className="sale-badge">Giảm {product.percentDiscount}%</div>
                            ) : (
                              <div className="sale-badge">SALE</div>
                            )
                          )}
                          <img
                            style={{ height: 'auto' }}
                            src={product.images.length > 0 ? product.images[0]?.base_url : '/img/logo.jpg'}
                            alt={product.name}
                          />
                        </Link>
                        <div className="product-card-content">
                          <h3 className="product-card-title">{product.name}</h3>
                          <div className="price-box">
                            {product && product.discountedPrice == null || product.percentDiscount == null
                              ?
                              <span className="price">
                                {product.price ? Number(product.price).toLocaleString('vi-VN') + 'đ' : null}
                              </span>
                              :
                              <>
                                <span className="price">
                                  {Number(product.discountedPrice).toLocaleString('vi-VN')}đ
                                </span>
                                <span className="compare-price">
                                  {Number(product.price).toLocaleString('vi-VN')}đ
                                </span>
                              </>
                            }
                          </div>
                          <div className="product-button">
                            <Link to={PATH.contact} className="btn-sell-contact">
                              Liên hệ
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Không có sản phẩm nào.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchPage;
