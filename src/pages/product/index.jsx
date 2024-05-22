import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import Skeleton from '@/components/Skeleton';
import useQuery from '@/hooks/useQuery';
import { productServiceHHB } from '@/services/product.service';
import createArray from '@/utils/createArray';
import React, { useMemo, useRef, useState } from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import { useCategoriesHHB } from '@/hooks/useCategories';
import CategoryLink from '@/components/CategoryLink';
import { cn } from '@/utils';
import { PATH } from '@/config';
import useQueryParams from '@/hooks/useQueryParams';
import useEffectDidMount from '@/hooks/useEffectDidMount';
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

  const [paramsFilter, setParamsFilter] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const topRef = useRef();
  const [minPrice, setMinPrice] = useState(queryParams.minPrice || '');
  const [maxPrice, setMaxPrice] = useState(queryParams.maxPrice || '');
  const match = useMatch(PATH.category);

  //Khống chế việc render lần 1 cho price
  useEffectDidMount(() => {
    setMinPrice('');
    setMaxPrice('');
  }, [match?.params.id]);

  const { categoryListHHB, loadingCategoryHHB } = useCategoriesHHB();

  const productParams = useMemo(
    () => ({
      keyword: '',
      pageIndex: currentPage,
      pageSize: 10,
      categoryCode: !match ? null : match?.params.slug,
      orderType: paramsFilter,
    }),
    [match?.params.slug, paramsFilter, currentPage]
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
                    className="nav-link text-2xl border-bottom mb-6 font-semibold"
                  >
                    Danh mục sản phẩm
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
              </ul>
            </form>
          </div>
          <div className="col-12 col-md-8 col-lg-9">
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

              </div>
            </div>

            <div className="row align-items-center mb-7">
              <div className="col-12 col-md">
                {/* Search */}
                <div className="input-group input-group-merge">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Tìm kiếm"
                    onChange={(e) => setSearch(e.target.value.trim())}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-border" type="submit">
                      <i className="fe fe-search" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-auto">
                {/* Select */}
                <select
                  className="custom-select custom-select-xs"
                  value={paramsFilter}
                  onChange={(e) => {
                    setParamsFilter(e.target.value)
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

            {loadingCategoryHHB ? (
              createArray(16).map((_, id) => (
                <Skeleton key={id} height={24} />
              ))
            ) : (
              <>
                <div className="row">
                  <ProductCard
                    data={productsHHB?.data}
                    loading={loadingHHB}
                    loadingCount={9}
                    emptyText="Rất tiếc không có sản phẩm bạn tìm kiếm"
                  />
                </div>
              </>
            )}

            {/* Pagination */}
            {productsHHB && productsHHB.totalPages > 1 && <Pagination totalPage={productsHHB?.totalPages} onPageChange={setCurrentPage} />}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
