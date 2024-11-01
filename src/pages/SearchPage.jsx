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

  const formatPrice = (price) => {
    if (!price) return null;
  
    const roundedPrice = Math.round(price / 1000) * 1000; // Làm tròn đến hàng nghìn
    const priceInThousand = roundedPrice / 1000; // Chia cho 1000 để chuyển đổi thành đơn vị nghìn
  
    // Kiểm tra xem có làm tròn thành số nguyên không, nếu có thì thêm '000'
    return Number.isInteger(priceInThousand) ? `${priceInThousand}.000` : `${roundedPrice.toLocaleString('vi-VN')}đ`;
  };

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
      <nav className="py-3 bg-[#f5f5f5]">
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
                          {/* {product.discountedPrice == 0 || null ? null : (
                            product.percentDiscount == 0 || null ? (
                              <div className="sale-badge">Giảm {product.percentDiscount}%</div>
                            ) : null
                          )} */}
                          {product.discountedPrice !== null && product.percentDiscount ? (
                            <div className="sale-badge">
                              {`Giảm ${product.percentDiscount}%`}
                            </div>
                          ) : null}
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
                                {formatPrice(product.price) ? formatPrice(product.price).toLocaleString('vi-VN') + 'đ' : null}
                              </span>
                              :
                              <>
                                <span className="price">
                                  {formatPrice(product.discountedPrice).toLocaleString('vi-VN')}đ
                                </span>
                                <span className="compare-price">
                                  {formatPrice(product.price).toLocaleString('vi-VN')}đ
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
