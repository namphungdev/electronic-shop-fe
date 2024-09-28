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

  const paramProductPrice = {
    keyword: '',
    pageIndex: 1,
    pageSize: 8,
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
    pageSize: 8,
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
  });

  const paramTBVS = {
    keyword: "",
    pageIndex: 1,
    pageSize: 8,
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
  });

  const paramTON = {
    keyword: "",
    pageIndex: 1,
    pageSize: 8,
    code: "thiet-bi-ve-sinh",
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
  });

  return (
    <>
      {/* SLIDERS */}
      <section>
        <div className='container'>
          <Carousel autoSlide={true} >
            {sliders.map((s, index) => (
              <img key={index} src={s} alt={s} className="w-full" />
            ))}
          </Carousel>
        </div>
      </section>
      {/* TOP SELLERS */}
      <section className="py-10">
        <div className="container">
          <div className="flex">
            <h2 className="mb-4 inline-block font-bold text-3xl uppercase font-oswald relative pb-2 product-h2-custom">
              Sản phẩm giảm giá
            </h2>
            <div className='h-auto flex justify-end flex-1 overflow-hidden'>
              <div className="relative max-w-full">
                <ul className='flex max-w-full whitespace-nowrap p-0 m-0 text-right pb-2 overflow-x-auto overflow-y-hidden list-none'>
                  {['Thiết bị vệ sinh', 'Gạch ốp lát', 'Tấm ốp nhựa'].map((item, index) => (
                    <li
                      key={index}
                      className={`relative font-medium bg-gray-200 px-5 py-1.5 transition-all duration-300 tab-cate ${activeIndex === index ? 'li-current' : ''}`}
                      onClick={() => clickProductSell(index)}
                    >
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="block-product-sell">
            {loadingDataPrice ? (
              <div className="loading-container">
                <Spin size="large" />
              </div>
            ) : (
              <div className="product-row row">
                {dataPrice && dataPrice.length > 0 ? (
                  dataPrice.map((product) => (
                    <div key={product.id} className="product-card">
                      <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                        <div className="sale-badge">SALE</div>
                        <img
                          style={{ height: 'auto' }}
                          srcSet={product.images[0].base_url}
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
        </div>
      </section>
      {/* PRODUCT */}
      <section className="py-10">
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
              <div className="product-row row">
                {dataGachOpLat && dataGachOpLat?.data?.length > 0 ? (
                  dataGachOpLat?.data.map((product) => (
                    <div key={product.id} className="product-card">
                      <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                        <img
                          style={{ height: 'auto' }}
                          srcSet={product.images[0].base_url}
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
        </div>
      </section>
      <section className="py-10">
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
              <div className="product-row row">
                {dataTBVS && dataTBVS?.data?.length > 0 ? (
                  dataTBVS?.data.map((product) => (
                    <div key={product.id} className="product-card">
                      <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                        <img
                          style={{ height: 'auto' }}
                          srcSet={product.images[0].base_url}
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
        </div>
      </section>
      <section className="py-10">
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
              <div className="product-row row">
                {dataTON && dataTON?.data?.length > 0 ? (
                  dataTON?.data.map((product) => (
                    <div key={product.id} className="product-card">
                      <Link className="navbar-brand" to={`${PATH.productDetail.replace(':slug', product.code)}`}>
                        <img
                          style={{ height: 'auto' }}
                          srcSet={product.images[0].base_url}
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
        </div>
      </section>
      {/* BRANCH */}
      <section className="py-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="text-center">
              {/* Heading */}
              <h2 className="mb-5">Các đối tác của chúng tôi</h2>
              {/* Preheading */}
              <h6 className="heading-xxs mb-3 text-gray-400">
                Chúng tôi luôn chọn những đối tác tin cậy và uy tín để đảm bảo những sản phẩm có chất lượng tốt nhất để gửi tới bạn.
              </h6>
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
                  320: { slidesPerView: 2 },
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
