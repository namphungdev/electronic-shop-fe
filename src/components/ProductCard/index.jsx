import { PATH } from '@/config';
import useAction from '@/hooks/useAction';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useCategory } from '@/hooks/useCategories';
import useQuery from '@/hooks/useQuery';
import { productService } from '@/services/product.service';
import { updateCartAction } from '@/stores/cart/cartReducer';
import { cn, toFixed, toSlug } from '@/utils';
import currency from '@/utils/currency';
import withListLoading from '@/utils/withListLoading';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { generatePath, Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PopConfirm from '../PopConfirm';
import ProductCardLoading from '../ProductCardLoading';
import Rating from '../Rating';

const ProductCard = ({
  showWishList = true,
  images,
  discount_rate,
  categories,
  name,
  rating_average,
  real_price,
  review_count,
  price,
  slug,
  id,
  fetchWishList,
  className,
}) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const img1 = images?.[0]?.base_url
    ? images?.[0]?.base_url
    : images?.[1]?.base_url;
  const img2 = images?.[1]?.base_url
    ? images?.[1]?.base_url
    : images?.[0]?.base_url;

  const categoryItem = useCategory(categories);

  const linkCategory = useMemo(() => {
    if (categoryItem) {
      return generatePath(PATH.category, {
        slug: toSlug(categoryItem?.title),
        id: categories,
      });
    }
  }, [categoryItem]);

  //====add wishlist====
  const { fetchData: addWishlistService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => productService.addWishlist(...params),
    limitDuration: 1000,
  });

  const { fetchData: removeWishlistService } = useQuery({
    enabled: false,
    queryFn: ({ params }) => productService.removeWishlist(...params),
  });
  const onAddWishList = useAction({
    promise: addWishlistService,
    pendingMessage: (
      <p>
        Đang thêm sản phẩm
        <span className="font-semibold italic">"{`"${name}"`}"</span> vào danh
        sách yêu thích
      </p>
    ),
    successMessage: (
      <p>
        Đã thêm sản phẩm
        <span className="font-semibold italic">"{`"${name}"`}"</span> vào danh
        sách yêu thích
      </p>
    ),
    errorMessage: (
      <p>
        <span className="font-semibold italic">"{`"${name}"`}"</span> đã được
        thêm vào danh sách yêu thích trước đó
      </p>
    ),
  });

  const onRemoveWishList = useAction({
    promise: removeWishlistService,
    onSuccess: async () => {
      await fetchWishList();
    },
    pendingMessage: (
      <p>
        Đang xóa
        <span className="font-semibold italic">"{`"${name}"`}"</span> khỏi danh
        sách yêu thích
      </p>
    ),
    successMessage: (
      <p>
        Đã xóa
        <span className="font-semibold italic">"{`"${name}"`}"</span> khỏi danh
        sách yêu thích
      </p>
    ),
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  // ========== cart ===========
  const { cart } = useCart();
  const quantity = useMemo(() => {
    const { quantity } =
      cart?.listItems?.find((e) => e?.productId === id) || {};

    return quantity ? quantity + 1 : 1;
  }, [cart]);

  const handleUpdateCart = () => {
    user
      ? dispatch(
          updateCartAction({
            id,
            data: { quantity },
            toast: true,
            pending: (
              <>
                Đang thêm <span className="font-semibold italic">"{name}"</span>{' '}
                vào giỏ hàng
              </>
            ),
            success: (
              <>
                Đã thêm <span className="font-semibold italic">"{name}"</span>{' '}
                vào giỏ hàng thành công
              </>
            ),
          })
        )
      : (navigate(PATH.auth, {
          state: {
            redirect: pathname,
          },
        }),
        toast.warn('Vui lòng đăng nhập để mua sản phẩm'));
  };
  return (
    <div className={cn('col-6 col-md-4', className)}>
      {/* Card */}
      <div className="card mb-7">
        {/* Badge */}
        {discount_rate ? (
          <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
            - {discount_rate}%
          </div>
        ) : null}

        {/* Image */}
        <div className="card-img">
          {/* Image */}
          <Link className="card-img-hover" to={`/${slug}`}>
            <img className="card-img-top card-img-back" src={img1} alt="..." />
            <img className="card-img-top card-img-front" src={img2} alt="..." />
          </Link>
          {/* Actions */}
          <div className="card-actions">
            <span className="card-action"></span>
            <span className="card-action">
              <button
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
                onClick={handleUpdateCart}
              >
                <i className="fe fe-shopping-cart" />
              </button>
            </span>
            {showWishList ? (
              <PopConfirm
                placement="top"
                title="Thông báo"
                description="Vui lòng đăng nhập để thêm sản phẩm vào danh sách yêu thích"
                disabled={!!user}
                okText="Đăng nhập"
                onConfirm={() =>
                  navigate(PATH.auth, { state: { redirect: pathname } })
                }
              >
                <span className="card-action">
                  <button
                    className={cn('btn btn-xs btn-circle btn-white-primary')}
                    data-toggle="button"
                    onClick={() => {
                      user && onAddWishList(id);
                    }}
                  >
                    <i className="fe fe-heart" />
                  </button>
                </span>
              </PopConfirm>
            ) : (
              <span className="card-action">
                <button
                  className={cn('btn btn-xs btn-circle btn-white-primary')}
                  data-toggle="button"
                  onClick={() => onRemoveWishList(id)}
                >
                  <i className="fe fe-trash" />
                </button>
              </span>
            )}
          </div>
        </div>
        {/* Body */}
        <div className="card-body px-0 max-h-[207px]">
          {/* Category */}
          <div className="font-size-xs min-h-[20px]">
            {categoryItem && (
              <Link className="text-muted" to={linkCategory}>
                {categoryItem?.title}
              </Link>
            )}
          </div>
          {/* Title */}
          <div className="font-weight-bold">
            <Link
              className="text-body card-product-name"
              to={generatePath(PATH.productDetail, {
                slug,
              })}
            >
              {name}
            </Link>
          </div>
          <div className="card-product-rating">
            <span className="mr-2 h-full">
              {+rating_average ? toFixed(+rating_average) : ''}
            </span>
            {rating_average ? <Rating value={+rating_average} /> : null}
            {review_count ? (
              <span className="ml-2 h-full">{`(${review_count} reviews)`}</span>
            ) : null}
          </div>
          {/* Price */}
          <div className="card-product-price">
            {real_price && price && real_price < price ? (
              <>
                <span className="text-primary sale !text-[20px] mr-[4px]">
                  {currency(real_price)}
                </span>
                <span className="font-size-xs text-gray-350 text-decoration-line-through">
                  {currency(price)}
                </span>
              </>
            ) : (
              <span className="text-primary sale">{currency(price)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withListLoading(ProductCard, ProductCardLoading);
