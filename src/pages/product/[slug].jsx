import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import EmptyText from '@/components/EmptyText';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Field from '@/components/Field';
import ImagePreview from '@/components/ImagePreview';
import InputQuantity from '@/components/InputQuantity';
import Pagination from '@/components/Pagination';
import { ReviewCardList } from '@/components/ReviewCard';
import ShortenContent from '@/components/ShortenContent';
import Skeleton from '@/components/Skeleton';
import Tab from '@/components/Tab';
import ZoomImage from '@/components/ZoomImage';
import { PATH } from '@/config';
import useAction from '@/hooks/useAction';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import {
  getCategoryTitleBySlug,
  useCategoriesHHB,
} from '@/hooks/useCategories';
import { useForm } from '@/hooks/useForm';
import useQuery from '@/hooks/useQuery';
import useQueryParams from '@/hooks/useQueryParams';
import useScrollTop from '@/hooks/useScrollTop';
import { productService, productServiceHHB } from '@/services/product.service';
import { reviewService } from '@/services/review.service';
import { updateCartAction } from '@/stores/cart/cartReducer';
import { cn, required, toSlug } from '@/utils';
import createArray from '@/utils/createArray';
import currency from '@/utils/currency';
import handleError from '@/utils/handleError';
import queryString from 'query-string';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import Slider from '@/components/Slider';
import './style.css'

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();
  useScrollTop();
  const { slug } = useParams();
  const { cart, loading: loadingUpdatecart } = useCart();
  const { user } = useAuth();
  const [_, id] = slug.split('-p');
  const inputRef = useRef();
  const [valueRating, setValueRating] = useState(4);
  const { data: { data: detail = {} } = {}, loading: loadingGetProductDetail } =
    useQuery({
      enabled: !!id,
      queryFn: () => productService.getProductDetail(id),
      onError: () => {
        toast.warn('Sản phẩm không tồn tại');
        navigate(PATH.products);
      },
    });

  const { data: detailHHB = {}, loading: loadingGetProductDetailHHB } =
    useQuery({
      queryFn: () => productServiceHHB.getProductDetailHHB(slug),
      onError: () => {
        toast.warn('Sản phẩm không tồn tại');
        navigate(PATH.products);
      },
    });

  useEffect(() => {
    if (
      !loadingGetProductDetailHHB &&
      (!detailHHB || Object.keys(detailHHB).length === 0 || detailHHB?.data == null)
    ) {
      navigate(PATH.error);
    }
  }, [detailHHB, loadingGetProductDetailHHB, navigate]);


  const [srcImgHHB, setSrcImgHHB] = useState(() => {
    if (!loadingGetProductDetailHHB)
      return detailHHB?.data?.images?.[0]?.base_url;
  });

  useEffect(() => {
    if (!loadingGetProductDetailHHB)
      setSrcImgHHB(detailHHB?.data?.images?.[0]?.base_url);
  }, [detailHHB]);

  const { categoryListHHB, loadingCategoryHHB } = useCategoriesHHB();

  const categoryTitle = useMemo(() => {
    return getCategoryTitleBySlug(categoryListHHB, detailHHB?.data?.categories);
  }, [categoryListHHB, detailHHB?.data?.categories]);

  const quantity = useMemo(() => {
    const { quantity } =
      cart?.listItems?.find((e) => e?.productId === detail?.id) || {};

    return quantity ? quantity : 0;
  }, [cart, detail]);

  const handleUpdateCart = () => {
    toast.warning('Tính năng mua hàng đang trong quá trình phát triển', {
      autoClose: 5000,
    }
    )
    toast.success('Vui lòng liên hệ SĐT: 0965117729 để được hỗ trợ và tư vấn mua hàng nhanh nhất!', {
      autoClose: 5000,
    }
    )

    // user
    //   ? dispatch(
    //       updateCartAction({
    //         id: detail?.id,
    //         data: { quantity: quantity + +inputRef?.current },
    //         toast: true,
    //         pending: (
    //           <>
    //             Đang thêm{' '}
    //             <span className="font-semibold italic">"{detail?.name}"</span>{' '}
    //             vào giỏ hàng
    //           </>
    //         ),
    //         success: (
    //           <>
    //             Đã thêm{' '}
    //             <span className="font-semibold italic">"{detail?.name}"</span>{' '}
    //             vào giỏ hàng thành công
    //           </>
    //         ),
    //         alert: true,
    //       })
    //     )
    //   : (navigate(PATH.auth, {
    //       state: {
    //         redirect: pathname,
    //       },
    //     }),
    //     toast.warn('Vui lòng đăng nhập để mua sản phẩm'));
  };

  // ==== wishList ====
  const onAddWishList = useAction({
    promise: (params) => productService.addWishlist(params),
    pendingMessage: (
      <p>
        Đang thêm sản phẩm
        <span className="font-semibold italic">
          "{`${detailHHB?.data?.name}`}"
        </span>{' '}
        vào danh sách yêu thích
      </p>
    ),
    successMessage: (
      <p>
        Đã thêm sản phẩm
        <span className="font-semibold italic">
          "{`${detailHHB?.data?.name}`}"
        </span>{' '}
        vào danh sách yêu thích
      </p>
    ),
    errorMessage: (
      <p>
        <span className="font-semibold italic">
          "{`${detailHHB?.data?.name}`}"
        </span>{' '}
        đã được thêm vào danh sách yêu thích trước đó
      </p>
    ),
  });

  const galleryRef = useRef(null);
  useEffect(() => {
    $('[data-fancybox="gallery"]').fancybox({ Carousel: { infinite: true } });
  }, []);

  const { form, register, validate } = useForm({
    content: [
      required({ message: 'Vui lòng điền nhận xét của bạn về sản phẩm' }),
    ],
  });
  const [params] = useQueryParams();
  const _qs = queryString.stringify({
    page: params?.page,
  });
  const {
    data: { data: reviewList, paginate },
    fetchData: getReviewService,
    loading: loadingGetReview,
  } = useQuery({
    enabled: !!detail?.id,
    queryKey: _qs,
    queryFn: () => reviewService.getReview(detail?.id, _qs ? `?${_qs}` : ''),
    keepStorage: false,
  });
  const { loading: loadingPostReview, fetchData: postReviewService } = useQuery(
    {
      enabled: false,
      queryFn: ({ params }) => reviewService.postReview(...params),
    }
  );

  const onPostReview = async () => {
    if (validate()) {
      try {
        await postReviewService(detail?.id, {
          orderId: state?.orderId,
          content: form?.content,
          star: valueRating,
        });
        await getReviewService();
        toast.success('Cảm ơn những ý kiến đóng góp của bạn!');
        navigate(window.location.pathname + window.location.search, {
          replace: true,
        });
      } catch (error) {
        handleError(error);
      }
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {!loadingGetProductDetailHHB ? (
                <Breadcrumb>
                  <Breadcrumb.Item to={PATH.home}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
                  <Breadcrumb.Item>Tên sản phẩm</Breadcrumb.Item>
                </Breadcrumb>
              ) : (
                <Skeleton width={577} height={18} borderRadius={4} />
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* Product */}
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {loadingGetProductDetailHHB ? (
                <LoadingDetail />
              ) : (
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
                              src={srcImgHHB}
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
                    <div className="flickity-nav mx-n2 mb-10 mb-md-0 flex mt-5">
                      {detailHHB?.data?.images.slice(0, 4).map((e) => (
                        <div
                          className="col-12 cursor-pointer px-2"
                          style={{ maxWidth: 113 }}
                          onClick={() => setSrcImgHHB(e?.base_url)}
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
                      {detailHHB?.data?.images.length === 5 && (
                        <div
                          className="col-12 cursor-pointer px-2"
                          style={{ maxWidth: 113 }}
                          key={detailHHB?.data?.images?.[4]?.base_url}
                          onClick={() =>
                            setSrcImg(detailHHB?.data?.images?.[4]?.base_url)
                          }
                        >
                          <div
                            className="embed-responsive embed-responsive-1by1 bg-cover"
                            style={{
                              backgroundImage: `url(${detailHHB?.data?.images?.[4]?.base_url})`,
                            }}
                          ></div>
                        </div>
                      )}
                      {detailHHB?.data?.images.length > 5 && (
                        <div
                          className="col-12 cursor-pointer px-2 bg-gray-300 flex items-center justify-center"
                          style={{ maxWidth: 113 }}
                          onClick={() =>
                            galleryRef.current
                              .querySelectorAll('.image-item')[0]
                              .click()
                          }
                        >
                          + {detailHHB?.data?.images?.length - 4} <br /> ảnh
                        </div>
                      )}
                    </div>
                    <ImagePreview
                      ref={galleryRef}
                      images={detailHHB?.data?.images}
                    />
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
              )}
            </div>
          </div>
        </div>
      </section >

{/* REVIEWS */}
<section className="py-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
              {/* Preheading */}
              <h6 className="heading-xxs mb-3 text-gray-400">
                What buyers say
              </h6>
              {/* Heading */}
              <h2 className="mb-10">Latest buyers Reviews</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Slider
                className="select-none !pb-20"
                slidesPerView={1}
                spaceBetween={32}
                loop
                grabCursor
                speed={600}
                pagination={{ clickable: true }}
                breakpoints={{
                  //min-width
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-13.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Shoes
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Low top Sneakers
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={3}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        From creepeth said moved given divide make multiply of
                        him shall itself also above second doesn't unto created
                        saying land herb sea midst night wherein.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Logan Edwards,{' '}
                        <time dateTime="2019-06-01">01 Jun 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-14.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Dresses
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Cotton print Dress
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={5}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        God every fill great replenish darkness unto. Very open.
                        Likeness their that light. Given under image to. Subdue
                        of shall cattle day fish form saw spirit and given
                        stars, us you whales may, land, saw fill unto.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Jane Jefferson,{' '}
                        <time dateTime="2019-05-29">29 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-15.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          T-shirts
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Oversized print T-shirt
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={4}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        Fill his waters wherein signs likeness waters. Second
                        light gathered appear sixth fourth, seasons behold
                        creeping female.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Darrell Baker,{' '}
                        <time dateTime="2019-05-18">18 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-10.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Bags &amp; Accessories
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Suede cross body Bag
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={4}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        God every fill great replenish darkness unto. Very open.
                        Likeness their that light. Given under image to. Subdue
                        of shall cattle day fish form saw spirit and given
                        stars.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Pavel Doe,{' '}
                        <time dateTime="2019-05-29">29 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-13.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Shoes
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Low top Sneakers
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={3}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        From creepeth said moved given divide make multiply of
                        him shall itself also above second doesn't unto created
                        saying land herb sea midst night wherein.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Logan Edwards,{' '}
                        <time dateTime="2019-06-01">01 Jun 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-14.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Dresses
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Cotton print Dress
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={5}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        God every fill great replenish darkness unto. Very open.
                        Likeness their that light. Given under image to. Subdue
                        of shall cattle day fish form saw spirit and given
                        stars, us you whales may, land, saw fill unto.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Jane Jefferson,{' '}
                        <time dateTime="2019-05-29">29 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {!loadingGetProductDetailHHB ? (
        <>
          <section className="pt-11">
            <div className="container">
              <div className="row">
                <Tab>
                  <div className="col-12">
                    <div className="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">
                      <Tab.Title className="nav-link">Mô tả</Tab.Title>
                    </div>
                    <div className="tab-content">
                      <Tab.Content className="tab-pane">
                        <div className="row justify-content-center py-9">
                          <div className="col-12 col-lg-10 col-xl-8">
                            <div className="row">
                              <div className="col-12">

                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Content>
                    </div>
                  </div>
                </Tab>
              </div>
            </div>
          </section>

        </>
      ) : (
        <div className="min-h-[500px]"></div>
      )
      }
    </>
  );
};

const LoadingDetail = () => {
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="card">
          <Skeleton height={538} />
        </div>
        <div className="flickity-nav mx-n2 mb-10 mb-md-0 flex mt-5">
          {createArray(4)?.map((_, id) => (
            <Skeleton
              key={id}
              width={90}
              height={97}
              borderRadius={4}
              margin={'0 8px'}
            />
          ))}
        </div>
      </div>
      <div className="col-12 col-md-6 pl-lg-10">
        <div className="flex justify-between mb-1">
          <Skeleton borderRadius={4} width={196} height={15} />
          <Skeleton borderRadius={4} width={128} height={13} />
        </div>
        {/* <h3 className="mb-2">{detailHHB?.name}</h3> */}
        <Skeleton borderRadius={4} height={67.3} />
        <div className="mb-7">
          <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">
            <Skeleton borderRadius={4} height={14.7} width={124} />
          </span>
          <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
            <Skeleton borderRadius={4} height={18.7} width={168} />
          </span>
        </div>
        <Skeleton borderRadius={4} height={86.7} />
        <div>
          <div className="form-group">
            <div className="flex gap-2 mt-6">
              <Skeleton borderRadius={4} height={51.3} />
              <Skeleton borderRadius={4} height={51.3} />
              <Skeleton borderRadius={4} height={51.3} />
            </div>
            <Skeleton
              borderRadius={4}
              width={156}
              height={33.3}
              marginTop={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
