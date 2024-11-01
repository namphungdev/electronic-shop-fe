import Carousel from '@/components/Carousel';
import Slider from '@/components/Slider';
import useScrollTop from '@/hooks/useScrollTop';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH } from '@/config';
import { productTiles } from '@/services/product.service';
import useQuery from '@/hooks/useQuery';
import { Spin } from 'antd';
import './style.css'

export const Home = () => {
  useScrollTop();

  const formatPrice = (price) => {
    if (!price) return null;
  
    const roundedPrice = Math.round(price / 1000) * 1000; // Làm tròn đến hàng nghìn
    const priceInThousand = roundedPrice / 1000; // Chia cho 1000 để chuyển đổi thành đơn vị nghìn
  
    // Kiểm tra xem có làm tròn thành số nguyên không, nếu có thì thêm '000'
    return Number.isInteger(priceInThousand) ? `${priceInThousand}.000` : `${roundedPrice.toLocaleString('vi-VN')}đ`;
  };

  const sliders = [
    '/img/image-one.png',
    '/img/image-two.png',
    '/img/image-three.png',
  ]

  const branch = [
    '/img/tiles/apodio.png',
    '/img/tiles/catalan.jpg',
    '/img/tiles/cmc.png',
    '/img/tiles/dong-tam.jpg',
    '/img/tiles/feliz.png',
    '/img/tiles/gach-prime.jpg',
    '/img/tiles/logo_bluedragon.jpg',
    '/img/tiles/logo-tasa.jpg',
    '/img/tiles/perfetto.jpg',
    '/img/tiles/taicera.jpg',
    '/img/tiles/takao.jpg',
    '/img/tiles/ttc.png',
    '/img/tiles/viglacera.jpg'
  ]

  const [activeIndex, setActiveIndex] = useState(0);
  const [productCode, setProductCode] = useState();

  const idProduct = activeIndex + 1

  useEffect(() => {
    if (idProduct == 1) {
      setProductCode('gach-op-lat')
    } else if (idProduct == 2) {
      setProductCode('thiet-bi-ve-sinh')
    } else {
      setProductCode('tam-op-nhua')
    }
  }, [idProduct])

  const clickProductSell = (index) => {
    setActiveIndex(index)
  }

  const paramProductPrice = {
    keyword: '',
    pageIndex: 1,
    pageSize: 12,
    productType: productCode
  };

  const {
    data: { data: dataPrice = [], loading: loadingDataPrice } = {},
  } = useQuery({
    queryKey: `product-page-${JSON.stringify(productCode)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) => productTiles.productListDiscounted(paramProductPrice, signal),
    enabled: !!productCode,
  });

  const paramGachOpLat = {
    keyword: "",
    pageIndex: 1,
    pageSize: 12,
    code: "gach-op-lat",
    type: 1,
    order: "id",
    sort: "desc"
  }

  const {
    data: { data: dataGachOpLat = [], loading: loadingDataGach } = {},
  } = useQuery({
    queryKey: `gach-page-${JSON.stringify(productCode)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) => productTiles.webGetProductList(paramGachOpLat, signal),
    enabled: !!productCode,
    staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút để tránh gọi lại API
    refetchOnWindowFocus: false, // Không refetch lại khi người dùng focus lại vào cửa sổ
    cacheTime: 1000 * 60 * 30,
  });

  const paramTBVS = {
    keyword: "",
    pageIndex: 1,
    pageSize: 12,
    code: "thiet-bi-ve-sinh",
    type: 1,
    order: "id",
    sort: "desc"
  }

  const {
    data: { data: dataTBVS = [], loading: loadingDataTBVS } = {},
  } = useQuery({
    queryKey: `tbvs-page-${JSON.stringify(productCode)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) => productTiles.webGetProductList(paramTBVS, signal),
    enabled: !!productCode,
    staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút để tránh gọi lại API
    refetchOnWindowFocus: false, // Không refetch lại khi người dùng focus lại vào cửa sổ
    cacheTime: 1000 * 60 * 30,
  });

  const paramTON = {
    keyword: "",
    pageIndex: 1,
    pageSize: 12,
    code: "tam-op-nhua",
    type: 1,
    order: "id",
    sort: "desc"
  }

  const {
    data: { data: dataTON = [], loading: loadingDataTON } = {},
  } = useQuery({
    queryKey: `ton-page-${JSON.stringify(productCode)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) => productTiles.webGetProductList(paramTON, signal),
    enabled: !!productCode,
    staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút để tránh gọi lại API
    refetchOnWindowFocus: false, // Không refetch lại khi người dùng focus lại vào cửa sổ
    cacheTime: 1000 * 60 * 30,
  });

  return (
    <>
      {/* SLIDERS */}
      <section>
        <div className='container'>
          <Carousel autoSlide={true} >
            {sliders.map((s, index) => (
              <img key={index} src={s} alt={`slider ${index + 1}`} className="w-full" />
            ))}
          </Carousel>
        </div>
      </section>
      {/* TOP SELLERS */}
      <section className="py-5">
        <div className="container">
          <div className="header-sell">
            <h1 className="text-white relative items-center font-bold text-3xl uppercase font-oswald sale-header">
              <img className='img-hot-sale' src="/img/hot-sale.png" alt="" />
              Sản phẩm giảm giá
            </h1>

            <nav className='h-auto flex align-center justify-end flex-1 overflow-hidden'>
              <div className="relative max-w-full text-white text-nav-sale">
                <ul className='flex max-w-full whitespace-nowrap p-0 m-0 text-right overflow-x-auto overflow-y-hidden list-none'>
                  {['Gạch ốp lát', 'Thiết bị vệ sinh', 'Tấm ốp nhựa'].map((item, index) => (
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
            </nav>
          </div>
          <nav className="block-product-sell sell-content">
            {loadingDataPrice ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className={dataPrice && dataPrice.length > 0 ? "product-row product-sale" : "product-sale"}>
                  {dataPrice && dataPrice.length > 0 ? (
                    dataPrice.slice(0, 10).map((product) => (
                      <article key={product.id} className="product-card">
                        <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
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
                      </article >
                    ))
                  ) : (
                    <p>Không có sản phẩm nào.</p>
                  )}
                </div>
                {dataPrice && dataPrice.length > 10 ? (
                  <div className="see-more-sale">
                    <Link className="btn-see-more" to={PATH.sale}>
                      Xem thêm
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </nav>
        </div>
      </section>
      {/* PRODUCT */}
      <section className="py-5">
        <div className="container">
          <div className="flex">
            <h2 className="mb-4 inline-block font-bold text-3xl uppercase font-oswald relative pb-2 product-h2-custom">
              <Link to={`${PATH.products}/gach-op-lat`} style={{ color: '#000' }}>
                Gạch ốp lát
              </Link>
            </h2>
          </div>
          <div className="block-product-sell">
            {loadingDataGach ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className={dataGachOpLat && dataGachOpLat?.data?.length > 0 ? "product-row row" : " row "}>
                  {dataGachOpLat && dataGachOpLat?.data?.length > 0 ? (
                    dataGachOpLat?.data?.slice(0, 10).map((product) => (
                      <article key={product.id} className="product-card">
                        <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                          {/* {product.percentDiscount ? (
                            <div className="sale-badge">
                              {`Giảm ${product.percentDiscount}%`}
                            </div>
                          ) : null} */}
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
                      </article>
                    ))
                  ) : (
                    <p>Không có sản phẩm nào.</p>
                  )}
                </div>
                {dataGachOpLat && dataGachOpLat?.data?.length > 10 ? (
                  <div className="see-more-container">
                    <Link className="btn-see-more" to={`${PATH.products}/gach-op-lat`}>
                      Xem thêm
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="flex">
            <h2 className="mb-4 inline-block font-bold text-3xl uppercase font-oswald relative pb-2 product-h2-custom">
              <Link to={`${PATH.products}/thiet-bi-ve-sinh`} style={{ color: '#000' }}>
                Thiết bị vệ sinh
              </Link>
            </h2>
          </div>
          <div className="block-product-sell">
            {loadingDataTBVS ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className={dataTBVS && dataTBVS?.data?.length > 0 ? "product-row row" : " row "}>
                  {dataTBVS && dataTBVS?.data?.length > 0 ? (
                    dataTBVS?.data.slice(0, 10).map((product) => (
                      <article key={product.id} className="product-card">
                        <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                          {/* {product.percentDiscount ? (
                            <div className="sale-badge">
                              {`Giảm ${product.percentDiscount}%`}
                            </div>
                          ) : null} */}
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
                      </article>
                    ))
                  ) : (
                    <p>Không có sản phẩm nào.</p>
                  )}
                </div>
                {dataTBVS && dataTBVS?.data?.length > 10 ? (
                  <div className="see-more-container">
                    <Link className="btn-see-more" to={`${PATH.products}/thiet-bi-ve-sinh`}>
                      Xem thêm
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="container">
          <div className="flex">
            <h2 className="mb-4 inline-block font-bold text-3xl uppercase font-oswald relative pb-2 product-h2-custom">
              <Link to={`${PATH.products}/tam-op-nhua`} style={{ color: '#000' }}>
                Tấm ốp nhựa
              </Link>
            </h2>
          </div>
          <div className="block-product-sell">
            {loadingDataTON ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <>
                <div className={dataTON && dataTON?.data?.length > 0 ? "product-row row" : " row "}>
                  {dataTON && dataTON?.data?.length > 0 ? (
                    dataTON?.data?.slice(0, 10).map((product) => (
                      <article key={product.id} className="product-card">
                        <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                          {/* {product.discountedPrice != null && (
                            <div className="sale-badge">
                              {product.percentDiscount ? `Giảm ${product.percentDiscount}%` : 'SALE'}
                            </div>
                          )} */}
                          {/* {product.percentDiscount ? (
                            <div className="sale-badge">
                              {`Giảm ${product.percentDiscount}%`}
                            </div>
                          ) : null} */}

                          {/* {product.percentDiscount ? (
                            <div className="sale-badge">
                              {`Giảm ${product.percentDiscount}%`}
                            </div>
                          ) : null} */}

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
                      </article>
                    ))
                  ) : (
                    <p>Không có sản phẩm nào.</p>
                  )}
                </div>
                {dataTON && dataTON?.data?.length > 10 ? (
                  <div className="see-more-container">
                    <Link className="btn-see-more" to={`${PATH.products}/tam-op-nhua`}>
                      Xem thêm
                    </Link>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </section>
      {/* BRANCH */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="text-center">
              {/* Heading */}
              <h2 className="mb-5">Các đối tác của chúng tôi</h2>
              {/* Preheading */}
              <h3 className="heading-xxs mb-3 text-gray-400">
                Chúng tôi luôn chọn những đối tác tin cậy và uy tín để đảm bảo những sản phẩm có chất lượng tốt nhất để gửi tới bạn.
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Slider
                className="select-none"
                slidesPerView={6}
                spaceBetween={10}
                loop
                grabCursor
                speed={600}
                autoplay={{ delay: 3000 }}
                breakpoints={{
                  320: { slidesPerView: 4 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 6 },
                }}
              >
                {branch.map((src, index) => (
                  <div key={index} className="slider-item">
                    <img
                      src={src}
                      alt={`branch-${index}`}
                      className="slider-img"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
