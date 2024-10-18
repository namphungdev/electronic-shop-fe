import Breadcrumb from '@/components/Breadcrumb';
import Skeleton from '@/components/Skeleton';
import { PATH } from '@/config';
import useQuery from '@/hooks/useQuery';
import useScrollTop from '@/hooks/useScrollTop';
import { productTiles } from '@/services/product.service';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './sale.css'

const SalePage = () => {
  useScrollTop()

  const [activeIndex, setActiveIndex] = useState(0);
  const [productCode, setProductCode] = useState();

  const idProduct = activeIndex + 1

  useEffect(() => {
    if (idProduct == 1) {
      setProductCode('thiet-bi-ve-sinh')
    } else if (idProduct == 2) {
      setProductCode('gach-op-lat')
    } else {
      setProductCode('tam-op-nhua')
    }
  }, [idProduct])

  const clickProductSell = (index) => {
    setActiveIndex(index)
  }

  const params = {
    keyword: '',
    pageIndex: 1,
    pageSize: 50,
    productType: productCode
  }

  const {
    data: { data: dataPrice = [], loading: loadingDataPrice } = {},
  } = useQuery({
    queryKey: `product-page-${JSON.stringify(productCode)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) => productTiles.productListDiscounted(params, signal),
    enabled: !!productCode,
  });

  return (
    <>
      <nav className="py-3 bg-[#f5f5f5] mb-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {!loadingDataPrice ? (
                <Breadcrumb>
                  <Breadcrumb.Item to={PATH.home}>Trang chủ</Breadcrumb.Item>
                  <Breadcrumb.Item>Sản phẩm giảm giá</Breadcrumb.Item>
                </Breadcrumb>
              ) : (
                <Skeleton width={577} height={18} borderRadius={4} />
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="py-5">
        <div className="container">
          <div className="flex header-sell">
            <div className="text-white relative items-center font-bold text-3xl uppercase font-oswald sale-header">
              <img className='img-hot-sale' src="/img/hot-sale.png" alt="" />
              Sản phẩm giảm giá
            </div>
            <div className='h-auto flex align-center justify-end flex-1 overflow-hidden'>
              <div className="relative max-w-full text-white text-nav-sale">
                <ul className='flex max-w-full whitespace-nowrap p-0 m-0 text-right overflow-x-auto overflow-y-hidden list-none'>
                  {['Thiết bị vệ sinh', 'Gạch ốp lát', 'Tấm ốp nhựa'].map((item, index) => (
                    <li
                      key={index}
                      className={`relative font-bold px-5 color[#e81f15] py-1.5 transition-all duration-300 tab-cate ${activeIndex === index ? 'li-current' : ''}`}
                      onClick={() => clickProductSell(index)}
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="block-product-sell sell-content">
            {loadingDataPrice ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className="product-row product-sale">
                  {dataPrice && dataPrice.length > 0 ? (
                    dataPrice.map((product) => (
                      <div key={product.id} className="product-card">
                        <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                          {product?.percentDiscount == null ?
                            <div className="sale-badge">SALE</div>
                            :
                            <div className="sale-badge">Giảm {product?.percentDiscount}%</div>
                          }
                          <img
                            style={{ height: 'auto' }}
                            src={product.images.length > 0 ? product.images[0]?.base_url : '/img/logo.jpg'}
                            alt={product.name}
                          />
                        </Link>
                        <div className="product-card-content">
                          <h3 className="product-card-title">{product.name}</h3>
                          <div className="price-box">
                            <span className="price">
                              {Number(product.discountedPrice).toLocaleString('vi-VN')}đ
                            </span>
                            <span className="compare-price">
                              {Number(product.price).toLocaleString('vi-VN')}đ
                            </span>
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
  )
}

export default SalePage
