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
                  <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
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
            <div className="text-white relative items-center font-bold text-3xl uppercase font-oswald">
              <img style={{ objectFit: 'contain', width: '50px', height: 'auto', position: 'absolute', right: '-15%', bottom: '10%', background: 'transparent' }} src="/img/hot-sale.png" alt="" />
              Sản phẩm giảm giá
            </div>

            <div className='h-auto flex align-center justify-end flex-1 overflow-hidden'>
              <div className="relative max-w-full text-white">
                <ul className='flex max-w-full whitespace-nowrap p-0 m-0 text-right overflow-x-auto overflow-y-hidden list-none'>
                  {['Thiết bị vệ sinh', 'Gạch ốp lát', 'Tấm ốp nhựa'].map((item, index) => (
                    <li
                      key={index}
                      className={`relative font-bold text-xl px-5 color[#e81f15] py-1.5 transition-all duration-300 tab-cate ${activeIndex === index ? 'li-current' : ''}`}
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
                {dataPrice && dataPrice.length > 5 ? (
                  <div className="see-more-sale">
                    <Link className="btn-see-more" to={PATH.sale}>
                      Xem thêm
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>

    </>
  )
}

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

export default SalePage

{/* <div className="layout-collection">
        <div className="container">
          {loadingListDiscount ? (
            <LoadingDetail />
          ) : (
            <div className="product-row product-sale">
              {listDiscount && listDiscount.length > 0 ? (
                listDiscount.map((product) => (
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
          )}
        </div>
      </div> */}

// <div className=''>
//   <div className="flex header-sell">
//     <div className="text-white relative items-center font-bold text-3xl uppercase font-oswald">
//       <img style={{ objectFit: 'contain', width: '50px', height: 'auto', position: 'absolute', right: '-15%', bottom: '10%', background: 'transparent' }} src="/img/hot-sale.png" alt="" />
//       Sản phẩm giảm giá
//     </div>

//     <div className='h-auto flex align-center justify-end flex-1 overflow-hidden'>
//       <div className="relative max-w-full text-white">
//         <ul className='flex max-w-full whitespace-nowrap p-0 m-0 text-right overflow-x-auto overflow-y-hidden list-none'>
//           {['Thiết bị vệ sinh', 'Gạch ốp lát', 'Tấm ốp nhựa'].map((item, index) => (
//             <li
//               key={index}
//               className={`relative font-bold text-xl px-5 color[#e81f15] py-1.5 transition-all duration-300 tab-cate ${activeIndex === index ? 'li-current' : ''}`}
//               onClick={() => clickProductSell(index)}
//             >
//               <span>{item}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   </div>
//   <div className={`products-view view-content col-sm-12 col-12 col-md-12 ${listDiscount?.length === 0 ? 'no-products' : ''}`}>
//     {listDiscount && listDiscount.length > 0 ? (
//       <div className="product-grid product-content-view">
//         {listDiscount.map((product) => (
//           <div key={product.id} className="product-detail">
//             <div className="products-view-card">
//               <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
//                 {/* {product?.percentDiscount == null ?
//                   <div className="sale-badge">SALE</div>
//                   :
//                   <div className="sale-badge">Giảm {product?.percentDiscount}%</div>
//                 } */}
//                 <img
//                   style={{ height: 'auto' }}
//                   src={product.images.length > 0 ? product.images[0]?.base_url : '/img/logo.jpg'}
//                   alt={product.name}
//                 />
//               </Link>
//               <div className="product-card-content">
//                 <h3 className="product-card-title">{product.name}</h3>
//                 <div className="product-box">
//                   <span className="product-box-price">
//                     {Number(product.discountedPrice).toLocaleString('vi-VN')}đ
//                   </span>
//                   <span className="product-compare-price">{Number(product.price).toLocaleString('vi-VN')}đ</span>
//                 </div>
//                 <div className="product-button">
//                   <Link to={PATH.contact} className="btn-product-contact">
//                     Liên hệ
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <div className="no-products-message">
//         <img src="/img/not-found.png" alt="" />
//       </div>
//     )}
//   </div>
// </div>