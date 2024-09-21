import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { Pagination, Spin } from 'antd';
import axios from 'axios';
import './product/style.css';
import Skeleton from '@/components/Skeleton';
import { Link, useLocation } from 'react-router-dom';
import { PRODUCT_API_HHB } from '@/config';

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
    try {
      const response = await axios.post(`${PRODUCT_API_HHB}/web-get-product-list`, param);
      setDataSearch(response?.data?.data)
    } catch (error) {
      console.error('There has been a problem with your axios request:', error);
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
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Tìm kiếm</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <div className='text-center text-3xl mb-3'>
        Kết quả tìm kiếm: {keyword}
      </div>

      <div className="layout-collection">
        <div className="container">
          <div className='row'>
            <div className='products-view my-5 col-sm-12 col-12 col-md-12'>
              <div className="container row">
                <div className="product-detail">

                  {dataSearch && dataSearch?.data.length > 0 &&
                    (
                      dataSearch?.data?.map((item, id) => (
                        <div className='products-view-card' key={id}>
                          <img
                            style={{ height: 'auto' }}
                            src={item.images[0].base_url}
                            alt={item.name}
                          />
                          <div className="product-card-content">
                            <h3 className="product-card-title">{item.name}</h3>
                            <div className='product-box'>
                              <span className='product-box-price'>
                                {item.discountedPrice}
                              </span>
                              <span className='product-compare-price'>
                                {item.price}
                              </span>
                            </div>
                            <div className='product-button'>
                              <Link to="/contact" className='btn-product-contact'>
                                Liên hệ
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
