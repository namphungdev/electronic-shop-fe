import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import Skeleton from '@/components/Skeleton';
import Slider from '@/components/Slider';
import useQuery from '@/hooks/useQuery';
import { productServiceHHB } from '@/services/product.service';
import createArray from '@/utils/createArray';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useMatch, useSearchParams } from 'react-router-dom';
import useScrollTop from '@/hooks/useScrollTop';
import { useCategoriesHHB } from '@/hooks/useCategories';
import queryString from 'query-string';
import CategoryLink from '@/components/CategoryLink';
import { cn } from '@/utils';
import { PATH } from '@/config';
import useQueryParams from '@/hooks/useQueryParams';
import useEffectDidMount from '@/hooks/useEffectDidMount';
import Radio from '@/components/Radio';
import Rating from '@/components/Rating';
import Breadcrumb from '@/components/Breadcrumb';

const options = [
  {
    value: 'newest', // default
    title: 'Sản phẩm mới nhất',
  },
  {
    value: 'real_price.desc',
    title: 'Giá giảm dần',
  },
  {
    value: 'real_price.asc',
    title: 'Giá tăng dần',
  },
];
const ProductPage = () => {
  const [queryParams, setQueryParams] = useQueryParams({
    page: 1,
    // sort: "newest",
  });

  const topRef = useRef();
  const [minPrice, setMinPrice] = useState(queryParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(queryParams.maxPrice || '');
  const match = useMatch(PATH.category);
  //Khống chế việc render lần 1 cho price
  useEffectDidMount(() => {
    setMinPrice('');
    setMaxPrice('');
  }, [match?.params.id]);

  useScrollTop(
    [
      queryParams.page,
      match?.params.id,
      queryParams.minPrice,
      queryParams.maxPrice,
      queryParams.filterRating,
    ],
    topRef?.current?.getBoundingClientRect().top + window.scrollY
  );

  const { categoryListHHB, loadingCategoryHHB } = useCategoriesHHB();
  console.log('categoryListHHB 68', categoryListHHB);

  const productParams = useMemo(
    () => ({
      keyword: '',
      pageIndex: 1,
      pageSize: 10,
      categoryCode: match?.params.slug.includes('san-pham')
        ? null
        : match?.params.slug,
      orderType: 1,
    }),
    [match?.params.slug]
  );

  const {
    data: { data: productsHHB = [], paginate: { totalPageHHB } = {} } = {},
    loadingHHB,
  } = useQuery({
    queryKey: `product-page-${JSON.stringify(productParams)}`,
    keepPreviousData: true,
    keepStorage: false,
    queryFn: ({ signal }) =>
      productServiceHHB.getProductsHHB(productParams, signal),
  });

  const categoryTitleHHB = useMemo(() => {
    const { title } =
      categoryListHHB.find((e) => e.id === +match?.params.id) || {};
    return title || 'Tất cả sản phẩm';
  }, [match?.params.id, categoryListHHB.length]);

  const onSubmitPrice = (e) => {
    e.preventDefault();

    setQueryParams({
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    });
  };
  return (
    <section className="py-11">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 col-lg-3 self-start category-col">
            {/* Filters */}
            <form className="mb-10 mb-md-0" onSubmit={onSubmitPrice}>
              <ul className="nav nav-vertical" id="filterNav">
                <li className="nav-item">
                  {/* Toggle */}
                  <a
                    className="nav-link font-size-lg text-reset border-bottom mb-6"
                    href="#categoryCollapse"
                  >
                    Category
                  </a>
                  {/* Collapse */}
                  <div>
                    <div className="form-group">
                      <ul className="list-styled mb-0" id="productsNav">
                        {loadingCategoryHHB ? (
                          createArray(16).map((_, id) => (
                            <Skeleton key={id} height={24} />
                          ))
                        ) : (
                          <>
                            {' '}
                            <li className="list-styled-item">
                              <NavLink
                                className={cn(
                                  'list-styled-link',
                                  ({ isActive }) => ({ active: isActive })
                                )}
                                to={PATH.products}
                              >
                                Tất cả sản phẩm
                              </NavLink>
                            </li>
                            {categoryListHHB.map((e) => (
                              <li className="list-styled-item" key={e?.id}>
                                <CategoryLink
                                  {...e}
                                  className={cn({
                                    active: e?.id === +match?.params.id,
                                  })}
                                />
                              </li>
                            ))}
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </li>

                <li className="nav-item">
                  {/* Toggle */}
                  <span className="nav-link font-size-lg text-reset border-bottom mb-6">
                    Price
                  </span>
                  {/* Collapse */}
                  <div>
                    {/* Range */}
                    <div className="d-flex align-items-center">
                      {/* Input */}
                      <input
                        type="number"
                        min="0"
                        className="form-control form-control-xs"
                        placeholder="Thấp nhất"
                        pattern="[1-9]*"
                        value={minPrice}
                        onChange={(e) =>
                          +e.target.value > 0
                            ? setMinPrice(e.target.value)
                            : setMinPrice('')
                        }
                      />
                      {/* Divider */}
                      <div className="text-gray-350 mx-2">‒</div>
                      {/* Input */}
                      <input
                        type="number"
                        className="form-control form-control-xs"
                        placeholder="Cao nhất"
                        value={maxPrice}
                        pattern="[1-9]*"
                        onChange={(e) =>
                          setMaxPrice(+e.target.value > 0 ? e.target.value : '')
                        }
                      />
                    </div>
                    <button className="btn btn-outline-dark btn-block mt-5">
                      Apply
                    </button>
                  </div>
                </li>
              </ul>
            </form>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
            {/* Slider */}
            {/* Item */}
            {/* Header */}
            <div className="row align-items-center mb-7">
              <div className="col-12 col-md">
                {/* Heading */}
                <h3 ref={topRef} className="mb-1">
                  {categoryTitleHHB}
                </h3>
                {/* Breadcrumb */}
                <Breadcrumb>
                  <Breadcrumb.Item to={PATH.home}>Trang chủ</Breadcrumb.Item>
                  <Breadcrumb.Item>{categoryTitleHHB}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div className="col-12 col-md-auto">
                {/* Select */}
                <select
                  className="custom-select custom-select-xs"
                  value={queryParams.sort}
                  onChange={(e) => {
                    setQueryParams({
                      sort: e.target.value,
                      page: undefined,
                    });
                  }}
                >
                  {options.map((e) => (
                    <option value={e?.value} key={e.value}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {queryParams.search ? (
              <h4 className="mb-5">Tìm kiếm `{queryParams.search}`</h4>
            ) : (
              ''
            )}
            {/* Products */}
            {productsHHB.length > 0 && (
              <Pagination
                totalPage={totalPageHHB}
                style={{ marginBottom: 30 }}
              />
            )}

            <div className="row">
              <ProductCard
                data={productsHHB?.data}
                loading={loadingHHB}
                loadingCount={9}
                emptyText="Rất tiếc không có sản phẩm bạn tìm kiếm"
              />
            </div>

            {/* Pagination */}
            {productsHHB.length > 0 && <Pagination totalPage={totalPageHHB} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
