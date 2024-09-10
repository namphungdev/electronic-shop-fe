import Breadcrumb from '@/components/Breadcrumb';
import ImagePreview from '@/components/ImagePreview';
import ZoomImage from '@/components/ZoomImage';
import { PATH } from '@/config';
import './style.css'

const ProductDetailPage = () => {

  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Breadcrumb>
                <Breadcrumb.Item to={PATH.home}>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item>Tên sản phẩm</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </nav>
      {/* Product */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className='grid grid-cols-3 gap-3'>
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
                          className={`mb-4 overflow-hidden relative h-[450px] cursor-zoom-in`}
                          id="productSlider"
                          ref={imageWrapperRef}
                        >
                          <img
                            ref={imageRef}
                            src={''}
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
                    </ZoomImage>
                  </div>
                </div>
                <div className='product-description'>
                  <h1 className='title-product text-[2rem] m-0 mb-[5px] leading-none font-bold pb-2'>Tên sản phẩm</h1>
                  <div className='product-top clearfix'>
                    <div className='pb-1'>
                      Mã sản phẩm: BF410
                    </div>
                  </div>
                  <div className="inventory_quantity text-[1rem] flex mr-[15px]">
                    <span className='mb-break'>
                      <div className='stock-brand-title'>
                        Thương hiệu: TOTO
                      </div>
                    </span>
                    <span className="line-product">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                    <span className='mb-break'>
                      <div className='stock-brand-title'>
                        Tình trạng: Còn hàng
                      </div>
                    </span>
                  </div>
                  <div className="product-price">
                    <div className='special-price'>
                      <span>1,740,000đ</span>
                    </div>
                  </div>
                  <div className='product-btn'>
                    <button type="button" className="btn_base" id="button-cart">
                      <span className="txt-main">Liên hệ</span>
                    </button>
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
                        <img src="/img/product_policy_2.svg" alt="Bảo hành 12 tháng (click xem chi tiết)" />
                      </div>
                      <div className='info-policy'>
                        Bảo hành 12 tháng (click xem chi tiết)
                      </div>
                    </div>
                    <div className='policy-item'>
                      <span className='marker-policy'>3</span>
                      <div className='icon-policy'>
                        <img src="/img/product_policy_3.svg" alt="Đổi trả hàng trong 7 ngày (click xem chi tiết)" />
                      </div>
                      <div className='info-policy'>
                        Đổi trả hàng trong 7 ngày (click xem chi tiết)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >
    </>
  );
};

export default ProductDetailPage;
