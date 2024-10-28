import Breadcrumb from '@/components/Breadcrumb';
import ImagePreview from '@/components/ImagePreview';
import ZoomImage from '@/components/ZoomImage';
import { PATH, PRODUCT_API_HHB } from '@/config';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useScrollTop from '@/hooks/useScrollTop';
import axios from 'axios';
import { Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import Skeleton from '@/components/Skeleton';
import createArray from '@/utils/createArray';
import SliderProduct from '@/components/SliderProduct';
import './style.css'

const dataTest = [
  {
    "id": 290,
    "code": "voi-lavabo-toto-tlg11308ba-tlg11308b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLG11308BA (TLG11308B) Nóng Lạnh Gắn Tường",
    "price": 9360000,
    "discountedPrice": 7494000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/548b5337-e2cd-4aaf-8d81-3f24c984041b_voi-lavabo-toto-tlg11308b-gan-tuong-1090x1090.webp"
      }
    ]
  },
  {
    "id": 289,
    "code": "voi-lavabo-toto-tls04309b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLS04309B Nóng Lạnh Gắn Tường",
    "price": 6630000,
    "discountedPrice": 5305000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/3edd676b-1360-4e90-a6c4-604f17e6864a_voi-lavabo-toto-tls04309b-1090x1090.webp"
      }
    ]
  },
  {
    "id": 288,
    "code": "voi-lavabo-toto-tls03307b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLS03307B Nóng Lạnh Gắn Tường",
    "price": 6490000,
    "discountedPrice": 5195000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/13404eec-dbdc-43c8-a55c-02a970799a04_voi-lavabo-toto-tls03307b-1090x1090.webp"
      }
    ]
  },
  {
    "id": 287,
    "code": "voi-lavabo-toto-tlg04309bb-tlg04309b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLG04309BB (TLG04309B) Nóng Lạnh Gắn Tường",
    "price": 7330000,
    "discountedPrice": 5866000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/3c6d3cb0-c77b-4625-bf86-0af24cc0ff3f_voi-lavabo-toto-tlg04309b-1090x1090.webp"
      }
    ]
  },
  {
    "id": 286,
    "code": "voi-lavabo-toto-tls02308b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLS02308B Nóng Lạnh Gắn Tường",
    "price": 6870000,
    "discountedPrice": 5503000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/b5101f1f-15d1-4c02-8f3d-9d31bed3b136_voi-lavabo-toto-tls02308b-1090x1090.webp"
      }
    ]
  },
  {
    "id": 285,
    "code": "voi-lavabo-toto-tlg08308ba-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLG08308BA Nóng Lạnh Gắn Tường",
    "price": 16370000,
    "discountedPrice": 13104000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/aaad00a7-22d9-45c5-a0bb-bb5502eeb495_voi-lavabo-toto-tlg08308b-gan-tuong-1090x1090.webp"
      }
    ]
  },
  {
    "id": 284,
    "code": "voi-lavabo-toto-tlg02310bb-tlg02310b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLG02310BB (TLG02310B) Nóng Lạnh Gắn Tường",
    "price": 9160000,
    "discountedPrice": 7329000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/8ed79e82-bce5-4207-9d69-b0bda7a47dcb_voi-lavabo-toto-tlg02310b-1090x1090.webp"
      }
    ]
  },
  {
    "id": 283,
    "code": "voi-lavabo-toto-tls01310b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLS01310B Nóng Lạnh Gắn Tường",
    "price": 6870000,
    "discountedPrice": 5503000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/10a8b950-8f34-45f4-9893-e6a81e5e4bf0_voi-lavabo-toto-tls01310b-1090x1090.webp"
      }
    ]
  },
  {
    "id": 282,
    "code": "voi-lavabo-toto-tlg10307bb-tlg10307b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLG10307BB (TLG10307B) Nóng Lạnh Gắn Tường",
    "price": 11290000,
    "discountedPrice": 9034000,
    "percentDiscount": 20,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/75fad2d9-67f9-4874-9ad5-a7ce0ec23861_voi-lavabo-gan-tuong-toto-tlg10307b-1090x1090.webp"
      }
    ]
  },
  {
    "id": 281,
    "code": "voi-lavabo-toto-tlg07307bb-tlg07307b-nong-lanh-gan-tuong",
    "name": "Vòi Lavabo TOTO TLG07307BB (TLG07307B) Nóng Lạnh Gắn Tường",
    "price": 15530000,
    "discountedPrice": 12793000,
    "percentDiscount": 18,
    "images": [
      {
        "base_url": "https://storage.googleapis.com/gach315-e6136.appspot.com/image/0ff9e3d9-aaa5-4f2c-a1df-c27a2cddf05c_voi-lavabo-toto-TLG07307B-gan-tuong-1090x1090.webp"
      }
    ]
  }
]

const ProductDetailPage = () => {

  useScrollTop()

  const { TabPane } = Tabs;
  const location = useLocation();
  const [listDetail, setListDetail] = useState([])
  const galleryRef = useRef(null);
  const [loading, setLoading] = useState(true)
  const [code, setCode] = useState(null)
  const [dataRelation, setDataRelation] = useState([])
  console.log('dataRelation', dataRelation)
  console.log('code', code)

  async function fetchDetailList() {
    try {
      const response = await axios.get(`${PRODUCT_API_HHB}/web-get-product-detail?code=${location.pathname.slice(10)}`);
      await setCode(response?.data?.data?.productCategoryCode)
      await setListDetail(response?.data?.data)
      await setLoading(false)
    } catch (error) {
      console.error('There has been a problem with your axios request:', error);
      await setLoading(false)
    } finally {
      await setLoading(false)
    }
  }

  const param = {
    keyword: '',
    pageIndex: 1,
    pageSize: 10,
    code: code,
    type: 2,
    order: 'id',
    sort: 'desc'
  }

  async function webGetProductList() {
    setLoading(true)
    try {
      const response = await axios.post(`${PRODUCT_API_HHB}/web-get-product-list`, param);
      await setDataRelation(response?.data?.data?.data)
      await setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('There has been a problem with your axios request:', error);
    }
  }

  useEffect(() => {
    fetchDetailList()
    webGetProductList()
  }, [])

  const [srcImg, setSrcImg] = useState(() => {
    return listDetail?.images?.[0]?.base_url;
  });

  useEffect(() => {
    setSrcImg(listDetail?.images?.[0]?.base_url);
  }, [listDetail]);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {!loading ? (
                <Breadcrumb>
                  <Breadcrumb.Item to={PATH.home}>Trang chủ</Breadcrumb.Item>
                  <Breadcrumb.Item>{listDetail.name}</Breadcrumb.Item>
                </Breadcrumb>
              ) : (
                <Skeleton width={577} height={18} borderRadius={4} />
              )
              }
            </div>
          </div>
        </div>
      </nav>
      {/* Product */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {loading ? (
                <LoadingDetail />
              ) :
                (
                  <div className='product-detail-content'>
                    <div className="product-image">
                      <div className="card">
                        <ZoomImage timesIncrease={2}>
                          {({
                            handleMouseLeave,
                            handleZoomImage,
                            imageRef,
                            imageWrapperRef,
                            styleImage,
                          }) => (
                            <div
                              className={`mb-4 relative overflow-hidden h-[450px] cursor-zoom-in`}
                              ref={imageWrapperRef}
                              style={{
                                position: 'relative',
                                overflow: 'hidden',
                                height: '450px', // Cố định chiều cao của vùng chứa
                              }}
                            >
                              <img
                                ref={imageRef}
                                // src={srcImg}
                                src={srcImg?.length > 0 ? srcImg : '/img/logo.jpg'}
                                alt="..."
                                className="card-img-top relative top-0 left-0 w-full h-full object-cover"
                                style={{
                                  ...styleImage,
                                  //maxWidth: '100%',  // Đảm bảo ảnh không vượt quá kích thước vùng chứa
                                  maxHeight: '100%',
                                  //objectFit: 'cover',  // Giữ kích thước ảnh phù hợp trong vùng chứa
                                }}
                              />
                              <div
                                className="image-cover absolute inset-0 z-10"
                                onMouseMove={handleZoomImage}
                                onMouseLeave={handleMouseLeave}
                              />
                            </div>
                          )}
                        </ZoomImage>
                      </div>
                      <div className='flickity-nav mx-n2 mb-md-0 flex mt-5'>
                        {listDetail?.images?.slice(0, 4).map((e) => (
                          <div
                            className="col-12 cursor-pointer px-2"
                            style={{ maxWidth: 113 }}
                            onClick={() => setSrcImg(e?.base_url)}
                            key={e?.base_url}
                          >
                            <div
                              className="embed-responsive embed-responsive-1by1 bg-cover"
                              style={{
                                backgroundImage: `url(${e?.base_url})`,
                              }}
                            ></div>
                          </div>
                        ))}
                        {listDetail?.images?.length === 5 && (
                          <div
                            className="col-12 cursor-pointer px-2"
                            style={{ maxWidth: 113 }}
                            key={listDetail?.images?.[4]?.base_url}
                            onClick={() =>
                              setSrcImg(listDetail?.images?.[4]?.base_url)
                            }
                          >
                            <div
                              className="embed-responsive embed-responsive-1by1 bg-cover"
                              style={{
                                backgroundImage: `url(${listDetail?.images?.[4]?.base_url})`,
                              }}
                            ></div>
                          </div>
                        )}
                        {listDetail?.images?.length > 5 && (
                          <div
                            className="col-12 cursor-pointer px-2 bg-gray-300 flex items-center justify-center"
                            style={{ maxWidth: 113 }}
                            onClick={() =>
                              galleryRef.current
                                .querySelectorAll('.image-item')[0]
                                .click()
                            }
                          >
                            + {listDetail?.images.length - 4} <br /> ảnh
                          </div>
                        )}
                      </div>
                      <ImagePreview
                        ref={galleryRef}
                        images={listDetail?.images}
                      />
                    </div>
                    <div className='product-description'>
                      <h1 className='title-product'>{listDetail.name}</h1>
                      <div className="inventory_quantity text-[1rem] flex mr-[15px]">
                        <span className='mb-break'>
                          <div className='stock-brand-title'>
                            Tình trạng: {listDetail.quanlity >= 1 ? 'Còn hàng' : 'Hết hàng'}
                          </div>
                        </span>
                        {/* <span className="line-product">&nbsp;&nbsp;|&nbsp;&nbsp;</span> */}
                        <span className='mb-break'>
                          <div className='stock-brand-title'>
                            {/* Số lượng: {listDetail.quanlity} */}
                          </div>
                        </span>
                      </div>
                      <div className="product-price">

                        {listDetail && listDetail.discountedPrice == null && listDetail.percentDiscount == null
                          ?
                          <span className="special-price">
                            {listDetail.price ? Number(listDetail.price).toLocaleString('vi-VN') + 'đ' : null}
                          </span>
                          :
                          <>
                            <span className="special-price">
                              {Number(listDetail.discountedPrice).toLocaleString('vi-VN')}đ
                            </span>
                            <span className="basic-price">
                              {Number(listDetail.price).toLocaleString('vi-VN')}đ
                            </span>
                          </>
                        }
                      </div>
                      <div className='product-btn'>
                        <Link type="button" className="btn_base" id="button-cart" to="/lien-he">
                          <span className="txt-main">Liên hệ</span>
                        </Link>
                      </div>
                    </div>
                    <div className='product-commit'>
                      <div className="block-policy">
                        <div className='policy-item'>
                          <span className='marker-policy'>1</span>
                          <div className='icon-policy'>
                            <img src="/img/product_policy_1.svg" alt="Cam kết chính hãng 100%" />
                          </div>
                          <div className='info-policy'>
                            Cam kết chính hãng 100%
                          </div>
                        </div>
                        <div className='policy-item'>
                          <span className='marker-policy'>2</span>
                          <div className='icon-policy'>
                            <img src="/img/product_policy_2.svg" alt="Bảo hành chính hãng" />
                          </div>
                          <div className='info-policy'>
                            Bảo hành chính hãng
                          </div>
                        </div>
                        <div className='policy-item'>
                          <span className='marker-policy'>3</span>
                          <div className='icon-policy'>
                            <img src="/img/product_policy_3.svg" alt="Đổi trả hàng trong 7 ngày" />
                          </div>
                          <div className='info-policy'>
                            Đổi trả hàng trong 7 ngày
                          </div>
                        </div>
                        <div className='policy-item'>
                          <span className='marker-policy'>4</span>
                          <div className='icon-policy'>
                            <img style={{ marginTop: '-7px' }} src="/img/free-ship.png" alt="Miễn phí vận chuyển TPHCM" />
                          </div>
                          <div className='info-policy'>
                            Miễn phí vận chuyển TPHCM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section >
      {/* Description */}
      <section>
        <div className='description-slug container'>
          <Tabs className='my-3' defaultActiveKey="1">
            <TabPane tab="Thông tin" key="1">
              {listDetail?.description !== null || listDetail?.description !== '' ?
                <div style={{
                  border: '1px solid #ddd',
                  padding: '20px'
                }} dangerouslySetInnerHTML={{ __html: listDetail?.description }} /> :
                <div className='description-infor'>
                  <FontAwesomeIcon icon={faBan} style={{ color: 'red', marginRight: '10px' }} />
                  Không có mô tả nào được tìm thấy
                </div>
              }
            </TabPane>
          </Tabs>
        </div>
      </section>
      {/* Policy */}
      <section>
        <div className='product-commit-mobile container mb-7'>
          <div className="block-policy">
            <div className='policy-item'>
              <span className='marker-policy'>1</span>
              <div className='icon-policy'>
                <img src="/img/product_policy_1.svg" alt="Cam kết chính hãng 100%" />
              </div>
              <div className='info-policy'>
                Cam kết chính hãng 100%
              </div>
            </div>
            <div className='policy-item'>
              <span className='marker-policy'>2</span>
              <div className='icon-policy'>
                <img src="/img/product_policy_2.svg" alt="Bảo hành chính hãng" />
              </div>
              <div className='info-policy'>
                Bảo hành chính hãng
              </div>
            </div>
            <div className='policy-item'>
              <span className='marker-policy'>3</span>
              <div className='icon-policy'>
                <img src="/img/product_policy_3.svg" alt="Đổi trả hàng trong 7 ngày" />
              </div>
              <div className='info-policy'>
                Đổi trả hàng trong 7 ngày
              </div>
            </div>
            <div className='policy-item'>
              <span className='marker-policy'>4</span>
              <div className='icon-policy'>
                <img style={{ marginTop: '-7px' }} src="/img/free-ship.png" alt="Miễn phí vận chuyển TPHCM" />
              </div>
              <div className='info-policy'>
                Miễn phí vận chuyển TPHCM
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Slider */}
      <section className="py-12">
        <div className="container">
          <div style={{ padding: 0 }} className='col-12 col-title'>
            <h2 className='mb-4 inline-block font-bold text-3xl uppercase font-oswald relative pb-2 product-h1-custom'>
              Sản phẩm liên quan
            </h2>
          </div>
          <div className="row">
            <div className="col-12">
              <SliderProduct
                className="select-none-slider"
                slidesPerView={1}
                spaceBetween={16}
                loop
                grabCursor
                speed={600}
                breakpoints={{
                  450: { slidesPerView: 2, spaceBetween: 10 },
                  768: { slidesPerView: 3, spaceBetween: 10 },
                  1024: { slidesPerView: 4, spaceBetween: 10 },
                  1280: { slidesPerView: 5, spaceBetween: 10 },
                }}
              >
                {dataRelation !== undefined ? dataRelation && dataRelation.length > 0 : dataTest && dataTest.length > 0 ? (
                  dataTest.slice(0, 10).map((product) => (
                    <article key={product.id} className="product-card">
                      <Link
                        className="navbar-brand"
                        to={`${PATH.productDetail.replace(":slug", product.code)}`}
                      >
                        {product.discountedPrice != null && (
                          <div className="sale-badge">
                            {product.percentDiscount ? `Giảm ${product.percentDiscount}%` : "SALE"}
                          </div>
                        )}
                        <img
                          style={{ height: "auto" }}
                          src={product.images.length > 0 ? product.images[0]?.base_url : "/img/logo.jpg"}
                          alt={product.name}
                        />
                      </Link>
                      <div className="product-card-content">
                        <h3 className="product-card-title">{product.name}</h3>
                        <div className="price-box">
                          {product.discountedPrice == null ? (
                            <span className="price">
                              {product.price ? Number(product.price).toLocaleString("vi-VN") + "đ" : null}
                            </span>
                          ) : (
                            <>
                              <span className="price">
                                {Number(product.discountedPrice).toLocaleString("vi-VN")}đ
                              </span>
                              <span className="compare-price">
                                {Number(product.price).toLocaleString("vi-VN")}đ
                              </span>
                            </>
                          )}
                        </div>
                        <div className="product-button">
                          <Link to="/lien-he" className="btn-sell-contact">
                            Liên hệ
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No reviews available</p>
                )}
              </SliderProduct>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const LoadingDetail = () => {
  return (
    <div className="row">
      {/* Breadcrumb Skeleton */}
      <div className="col-12 mb-4">
        <Skeleton height={20} width={300} />
      </div>

      {/* Product Skeleton */}
      <div className="col-12">
        <div className="grid grid-cols-3 gap-3">
          {/* Product Image Skeleton */}
          <div className="product-image">
            <div className="card">
              <Skeleton height={450} />
            </div>
            <div className="flickity-nav mx-n2 mb-10 mb-md-0 flex mt-5">
              {createArray(4)?.map((_, id) => (
                <Skeleton
                  key={id}
                  width={113}
                  height={113}
                  borderRadius={4}
                  margin={'0 8px'}
                />
              ))}
            </div>
          </div>

          {/* Product Description Skeleton */}
          <div className="product-description">
            <Skeleton width={400} height={30} className="mb-3" />
            <div className="flex items-center mb-3">
              <Skeleton width={150} height={20} />
              <Skeleton width={50} height={20} className="mx-2" />
              <Skeleton width={50} height={20} />
            </div>
            <div className="mb-3">
              <Skeleton width={100} height={30} />
              <Skeleton width={80} height={20} />
            </div>
            <Skeleton width={150} height={40} />
          </div>

          {/* Product Commit Skeleton */}
          <div className="product-commit">
            {createArray(3).map((_, id) => (
              <div key={id} className="policy-item flex items-center mb-4">
                <Skeleton width={30} height={30} className="mr-3" />
                <Skeleton width={40} height={40} className="mr-3" />
                <Skeleton width={200} height={20} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description Skeleton */}
      <div className="col-12 mt-10">
        <div className="container">
          <Skeleton width={200} height={30} className="mb-3" />
          <Skeleton height={200} width="100%" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
