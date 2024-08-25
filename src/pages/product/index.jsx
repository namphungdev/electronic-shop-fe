import React, { useEffect, useMemo, useRef, useState } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import './style.css'

const options = [
  {
    value: 'newest',
    title: 'Sản phẩm mới nhất',
  },
  {
    value: 'real_price.desc',
    title: 'Giá thấp đến cao',
  },
  {
    value: 'real_price.asc',
    title: 'Giá cao đến thấp',
  },
];

const ProductPage = () => {

  return (
    <>
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Breadcrumb>
                <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
                <Breadcrumb.Item>Tên category</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>

      <div className="layout-collection">
        <div className="container">
          <div className='row'>
            <div className='col-12 col-title'>
              <h1>Thiết bị vệ sinh</h1>
            </div>
            <div className='block-collection col-sm-12 col-12 col-md-12'>
              <div className='col-list-cate'>
                <div className="tab-ul">
                  <div className="menu-list">
                    <div className='cate-item'>
                      Item 1
                    </div>
                    <div className='cate-item'>
                      Item 2
                    </div>
                    <div className='cate-item'>
                      Item 3
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-3">
                <div className="select-container">
                  <select className="custom-select custom-select-xs">
                    {options.map((e) => (
                      <option value={e?.value} key={e.value}>
                        {e.title}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon icon={faArrowDownAZ} className="select-icon" />
                </div>

              </div>
            </div>

            <div className='products-view'>
              <div className="row container">
                <div className='col-6 col-md-3 col-lg-4 col-xl-3'>
                    Item 1
                </div>

                <div className='col-6 col-md-3 col-lg-4 col-xl-3'>
                    Item 2
                </div>

                <div className='col-6 col-md-3 col-lg-4 col-xl-3'>
                    Item 3
                </div>

                <div className='col-6 col-md-3 col-lg-4 col-xl-3'>
                    Item 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
