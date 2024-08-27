import React from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { PATH } from '@/config';
import './style.css'
import { Pagination } from 'antd';

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

export const generateRandomProductData = (count) => {
  const names = [
    'Gạch Bông Lát Nền 60X60 VL75205 đá mờ',
    'Gạch Bông Lát Nền 80X80 VL75206 bóng kính',
    'Gạch Bông Lát Nền 30X30 VL75207 granite',
    'Gạch Bông Lát Nền 40X40 VL75208 sứ',
    'Gạch Bông Lát Nền 60X60 VL75209 nhám',
    'Gạch Bông Lát Nền 60X60 VL75209 nhám',
    'Gạch Bông Lát Nền 60X60 VL75209 nhám',
    'Gạch Bông Lát Nền 60X60 VL75209 nhám',
    'Gạch Bông Lát Nền 50X50 VL75210 gạch ốp saddadadasdasd',
    'Gạch Bông Lát Nền',
  ];

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: names[index % names.length],
    price: `${Math.floor(Math.random() * 100000) + 200}đ`,
  }));
};

const ProductPage = () => {

  const products = generateRandomProductData(10);

  return (
    <>
      <nav className="py-3 bg-[#f5f5f5] mb-5">
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
            <div className='products-view mt-5'>
              <div className="container">
                <div className='product-detail'>
                  {products.map((product) => (
                    <div key={product.id} className='products-view-card'>
                      <Link className='navbar-brand'>
                        <img
                          style={{ height: 'auto' }}
                          srcSet="/img/Gach-bong-lat-nen-2.jpg"
                          alt={product.name}
                        />
                      </Link>
                      <div className="product-card-content">
                        <h3 className="product-card-title">{product.name}</h3>
                        <div className='product-box'>
                          <span className='product-box-price'>
                            {product.price}
                          </span>
                        </div>
                        <div className='product-button'>
                          <Link to={PATH.contact} className='btn-product-contact'>
                            Liên hệ
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pagination-wrapper">
        <Pagination align="center" defaultCurrent={1} total={20} />
      </div>
    </>
  );
};

export default ProductPage;
