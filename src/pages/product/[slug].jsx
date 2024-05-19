import Breadcrumb from '@/components/Breadcrumb';
import Button from '@/components/Button';
import EmptyText from '@/components/EmptyText';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Field from '@/components/Field';
import ImagePreview from '@/components/ImagePreview';
import InputQuantity from '@/components/InputQuantity';
import Pagination from '@/components/Pagination';
import Rating from '@/components/Rating';
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
    user
      ? dispatch(
          updateCartAction({
            id: detail?.id,
            data: { quantity: quantity + +inputRef?.current },
            toast: true,
            pending: (
              <>
                Đang thêm{' '}
                <span className="font-semibold italic">"{detail?.name}"</span>{' '}
                vào giỏ hàng
              </>
            ),
            success: (
              <>
                Đã thêm{' '}
                <span className="font-semibold italic">"{detail?.name}"</span>{' '}
                vào giỏ hàng thành công
              </>
            ),
            alert: true,
          })
        )
      : (navigate(PATH.auth, {
          state: {
            redirect: pathname,
          },
        }),
        toast.warn('Vui lòng đăng nhập để mua sản phẩm'));
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
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {!loadingGetProductDetailHHB ? (
                <Breadcrumb>
                  <Breadcrumb.Item to={PATH.home}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>{categoryTitle}</Breadcrumb.Item>
                  <Breadcrumb.Item>{detailHHB?.data?.name}</Breadcrumb.Item>
                </Breadcrumb>
              ) : (
                <Skeleton width={577} height={18} borderRadius={4} />
              )}
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {loadingGetProductDetailHHB ? (
                <LoadingDetail />
              ) : (
                <div className="row">
                  <div className="col-12 col-md-6">
                    {/* Card */}
                    <div className="card">
                      {/* Badge */}
                      {/* <div className="badge badge-primary card-badge text-uppercase">
                        Sale
                      </div> */}
                      {/* Slider */}
                      <ZoomImage timesIncrease={2}>
                        {({
                          handleMouseLeave,
                          handleZoomImage,
                          imageRef,
                          imageWrapperRef,
                          styleImage,
                        }) => (
                          <div
                            className={`mb-4 overflow-hidden relative h-[538px] cursor-zoom-in`}
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
                  <div className="col-12 col-md-6 pl-lg-10">
                    {/* Header */}
                    <div className="row mb-1">
                      <div className="col">
                        {/* Preheading */}
                        <a className="text-muted">{categoryTitle}</a>
                      </div>
                      <div className="col-auto items-center flex">
                        {/* Rating */}
                        {/* {detail?.rating_average ? (
                          <Rating value={detail?.rating_average} />
                        ) : null}

                        <a
                          className="font-size-sm text-reset ml-2"
                          href="#reviews"
                        >
                          Reviews ({detail?.review_count})
                        </a> */}
                      </div>
                    </div>
                    {/* Heading */}
                    <h3 className="mb-2">{detailHHB?.data?.name}</h3>
                    {/* Price */}
                    <div className="mb-7">
                      {detailHHB?.data?.real_price < detailHHB?.data?.price ? (
                        <>
                          <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">
                            {currency(detailHHB?.data?.price)}
                          </span>
                          <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
                            {currency(detailHHB?.data?.real_price)}
                          </span>
                        </>
                      ) : (
                        <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
                          {currency(detailHHB?.data?.price)}
                        </span>
                      )}
                    </div>
                    <p>{detailHHB?.data?.short_description}</p>
                    {/* Form */}
                    <div>
                      <div className="form-group">
                        <div className="form-row mb-7 items-baseline">
                          <div className="col-12 col-lg-auto">
                            <InputQuantity
                              hideAction={true}
                              quantity={1}
                              ref={inputRef}
                            />
                          </div>
                          <div className="col-12 col-lg">
                            {/* Submit */}
                            <Button
                              onClick={handleUpdateCart}
                              className="btn-block mb-2 normal-case"
                              loading={loadingUpdatecart[detailHHB?.data?.id]}
                            >
                              Add to Cart
                              <i className="fe fe-shopping-cart ml-2" />
                            </Button>
                          </div>
                          <div className="col-12 col-lg-auto">
                            {/* Wishlist */}
                            <Button
                              className="btn-block mb-2 normal-case"
                              outline
                              onClick={() => onAddWishList(detailHHB?.data?.id)}
                            >
                              Wishlist <i className="fe fe-heart ml-2" />
                            </Button>
                          </div>
                        </div>
                        <p className="mb-0">
                          <span className="mr-4">Share:</span>
                          <a
                            className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                            href="#!"
                          >
                            <i className="fab fa-twitter" />
                          </a>
                          <a
                            className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                            href="#!"
                          >
                            <i className="fab fa-facebook-f" />
                          </a>
                          <a
                            className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                            href="#!"
                          >
                            <i className="fab fa-pinterest-p" />
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                      <Tab.Title className="nav-link">Description</Tab.Title>
                      <Tab.Title className="nav-link">Size &amp; Fit</Tab.Title>
                      <Tab.Title className="nav-link">
                        Shipping &amp; Return
                      </Tab.Title>
                    </div>
                    <div className="tab-content">
                      <Tab.Content className="tab-pane">
                        <div className="row justify-content-center py-9">
                          <div className="col-12 col-lg-10 col-xl-8">
                            <div className="row">
                              <div className="col-12">
                                <ShortenContent
                                  className="text-gray-500"
                                  dangerouslySetInnerHTML={{
                                    __html: detailHHB?.data?.description,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Content>
                      <Tab.Content className="tab-pane">
                        <div className="row justify-content-center py-9">
                          <div className="col-12 col-lg-10 col-xl-8">
                            <div className="row">
                              <div className="col-12 col-md-6">
                                {/* Text */}
                                <p className="mb-4">
                                  <strong>Fitting information:</strong>
                                </p>
                                {/* List */}
                                <ul className="mb-md-0 text-gray-500">
                                  <li>
                                    Upon seas hath every years have whose subdue
                                    creeping they're it were.
                                  </li>
                                  <li>Make great day bearing.</li>
                                  <li>
                                    For the moveth is days don't said days.
                                  </li>
                                </ul>
                              </div>
                              <div className="col-12 col-md-6">
                                {/* Text */}
                                <p className="mb-4">
                                  <strong>Model measurements:</strong>
                                </p>
                                {/* List */}
                                <ul className="list-unstyled text-gray-500">
                                  <li>Height: 1.80 m</li>
                                  <li>Bust/Chest: 89 cm</li>
                                  <li>Hips: 91 cm</li>
                                  <li>Waist: 65 cm</li>
                                  <li>Model size: M</li>
                                </ul>
                                {/* Size */}
                                <p className="mb-0">
                                  <img
                                    src="/img/icons/icon-ruler.svg"
                                    alt="..."
                                    className="img-fluid"
                                  />
                                  <a
                                    className="text-reset text-decoration-underline ml-3"
                                    data-toggle="modal"
                                    href="#modalSizeChart"
                                  >
                                    Size chart
                                  </a>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Tab.Content>
                      <Tab.Content className="tab-pane">
                        <div className="row justify-content-center py-9">
                          <div className="col-12 col-lg-10 col-xl-8">
                            {/* Table */}
                            <div className="table-responsive">
                              <table className="table table-bordered table-sm table-hover">
                                <thead>
                                  <tr>
                                    <th>Shipping Options</th>
                                    <th>Delivery Time</th>
                                    <th>Price</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Standard Shipping</td>
                                    <td>Delivery in 5 - 7 working days</td>
                                    <td>$8.00</td>
                                  </tr>
                                  <tr>
                                    <td>Express Shipping</td>
                                    <td>Delivery in 3 - 5 working days</td>
                                    <td>$12.00</td>
                                  </tr>
                                  <tr>
                                    <td>1 - 2 day Shipping</td>
                                    <td>Delivery in 1 - 2 working days</td>
                                    <td>$12.00</td>
                                  </tr>
                                  <tr>
                                    <td>Free Shipping</td>
                                    <td>
                                      Living won't the He one every subdue meat
                                      replenish face was you morning firmament
                                      darkness.
                                    </td>
                                    <td>$0.00</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            {/* Caption */}
                            <p className="mb-0 text-gray-500">
                              May, life blessed night so creature likeness
                              their, for.{' '}
                              <a
                                className="text-body text-decoration-underline"
                                href="#!"
                              >
                                Find out more
                              </a>
                            </p>
                          </div>
                        </div>
                      </Tab.Content>
                    </div>
                  </div>
                </Tab>
              </div>
            </div>
          </section>

          <section className="pt-9 pb-11" id="reviews">
            <div className="container">
              <ErrorBoundary>
                <div className="row">
                  <div className="col-12">
                    {reviewList && (
                      <h4 className="mb-10 text-center">
                        Customer Reviews ({reviewList.length})
                      </h4>
                    )}

                    {user && state?.orderId && (
                      <div className="h-auto" id="reviewForm">
                        <div className="row">
                          <div className="col-12 mb-6 text-center">
                            <p className="mb-1 font-size-xs">Score:</p>
                            <div className="rating-form">
                              <div
                                className="rating h5 text-dark"
                                data-value={valueRating}
                              >
                                {createArray(5).map((_, id) => (
                                  <div
                                    className="rating-item cursor-pointer"
                                    key={id}
                                    onClick={() => setValueRating(id + 1)}
                                  >
                                    <i className="fas fa-star" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <Field
                              {...register('content')}
                              className="form-control form-control-sm"
                              id="reviewText"
                              rows={5}
                              placeholder="Review *"
                              renderInput={({
                                error,
                                className,
                                _onChange,
                                ...props
                              }) => (
                                <textarea
                                  {...props}
                                  onChange={_onChange}
                                  className={cn(className, {
                                    'border-red-500 placeholder:text-red-500':
                                      error,
                                  })}
                                />
                              )}
                            />
                          </div>
                          <div className="col-12 text-center">
                            <Button
                              className="normal-case"
                              loading={loadingPostReview}
                              onClick={onPostReview}
                            >
                              Post Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mt-8">
                      <ReviewCardList
                        loading={loadingGetReview}
                        loadingCount={3}
                        empty={
                          <EmptyText>
                            Sản phẩm hiện tại chưa có đánh giá nào
                          </EmptyText>
                        }
                        data={reviewList}
                      />
                    </div>
                    {
                      <Pagination
                        totalPage={paginate?.totalPage}
                        style={{ marginTop: 20 }}
                      />
                    }
                  </div>
                </div>
              </ErrorBoundary>
            </div>
          </section>

          <section className="bg-light py-9">
            <div className="container">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex mb-6 mb-lg-0">
                    <i className="fe fe-truck font-size-lg text-primary" />
                    <div className="ml-6">
                      <h6 className="heading-xxs mb-1">Free shipping</h6>
                      <p className="mb-0 font-size-sm text-muted">
                        From all orders over $100
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex mb-6 mb-lg-0">
                    <i className="fe fe-repeat font-size-lg text-primary" />
                    <div className="ml-6">
                      <h6 className="mb-1 heading-xxs">Free returns</h6>
                      <p className="mb-0 font-size-sm text-muted">
                        Return money within 30 days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex mb-6 mb-md-0">
                    <i className="fe fe-lock font-size-lg text-primary" />
                    <div className="ml-6">
                      <h6 className="mb-1 heading-xxs">Secure shopping</h6>
                      <p className="mb-0 font-size-sm text-muted">
                        You're in safe hands
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="d-flex">
                    <i className="fe fe-tag font-size-lg text-primary" />
                    <div className="ml-6">
                      <h6 className="mb-1 heading-xxs">Over 10,000 Styles</h6>
                      <p className="mb-0 font-size-sm text-muted">
                        We have everything you need
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="min-h-[500px]"></div>
      )}
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
