import Breadcrumb from '@/components/Breadcrumb';
import ImagePreview from '@/components/ImagePreview';
import ZoomImage from '@/components/ZoomImage';
import { PATH, PRODUCT_API_HHB } from '@/config';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import useScrollTop from '@/hooks/useScrollTop';
import axios from 'axios';
import { Tabs } from 'antd';
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import Skeleton from '@/components/Skeleton';
import createArray from '@/utils/createArray';

const ProductDetailPage = () => {
  useScrollTop()

  const { TabPane } = Tabs;
  const location = useLocation();
  const [listDetail, setListDetail] = useState([])
  const galleryRef = useRef(null);
  const [loading, setLoading] = useState(true)

  async function fetchDetailList() {
    try {
      const response = await axios.get(`${PRODUCT_API_HHB}/web-get-product-detail?code=${location.pathname.slice(10)}`);
      await setListDetail(response?.data?.data)
      await setLoading(false)
    } catch (error) {
      console.error('There has been a problem with your axios request:', error);
      await setLoading(false)
    } finally {
      await setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetailList()
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
                        {/* <ZoomImage timesIncrease={2}>
                          {({
                            handleMouseLeave,
                            handleZoomImage,
                            imageRef,
                            imageWrapperRef,
                            styleImage,
                          }) => (
                            <div
                              className={`mb-4 overflow-hidden relative h-[450px] cursor-zoom-in`}
                              id="productSlider"
                              ref={imageWrapperRef}
                            >
                              <img
                                ref={imageRef}
                                src={srcImg}
                                alt="..."
                                className="card-img-top relative top-0 left-0 h-full object-cover"
                                style={styleImage}
                              />
                              <div
                                className="image-cover absolute inset-0 z-10"
                                onMouseMove={handleZoomImage}
                                onMouseLeave={handleMouseLeave}
                              />
                            </div>
                          )}
                        </ZoomImage> */}
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
                                src={srcImg}
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
                      <div className='flickity-nav mx-n2 mb-10 mb-md-0 flex mt-5'>
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
                        <span className="line-product">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <span className='mb-break'>
                          <div className='stock-brand-title'>
                            Số lượng: {listDetail.quanlity}
                          </div>
                        </span>
                      </div>
                      <div className="product-price">

                        {listDetail && listDetail.discountedPrice == null && listDetail.percentDiscount == null
                          ?
                          <span className="special-price">
                            {Number(listDetail.price).toLocaleString('vi-VN')}đ
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
        <div className='container'>
          <Tabs className='my-10' defaultActiveKey="1">
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
