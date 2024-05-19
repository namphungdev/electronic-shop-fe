import { PATH } from "@/config";
import { useCategories, useCategory } from "@/hooks/useCategories";
import useDebounce from "@/hooks/useDebounce";
import useQuery from "@/hooks/useQuery";
import useWindowSize from "@/hooks/useWindowSize";
import { productService } from "@/services/product.service";
import { onCloseDrawer } from "@/stores/drawerReducer";
import { toSlug } from "@/utils";
import queryString from "query-string";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link } from "react-router-dom";
import styled from "styled-components";
import Portal from "../Portal";
import SearchProduct from "../SearchProduct";

const ContentStyle = styled.div`
  height: ${({ height }) => `${height}px`} !important;
  overflow: hidden !important;
  &::-webkit-scrollbar {
    width: 5px;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: #ccc;
    border-radius: 10px;
  }
`;

const BodyStyled = styled.div`
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    width: 5px;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: #ccc;
    border-radius: 10px;
  }
  -webkit-overflow-scrolling: touch;
  .product-cart-item {
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
`;
const SearchDrawer = () => {
  const { open } = useSelector((state) => state.drawer.search);
  const size = useWindowSize();
  const dispatch = useDispatch();
  const onClose = () => dispatch(onCloseDrawer("search"));
  const [idCategory, setIDCategory] = useState();
  const [search, setSearch] = useState();
  const searchDebounce = useDebounce(search, 500);
  const [heightBody, setHeightBody] = useState();

  const { categoryList = [] } = useCategories([], open);
  const category = useCategory(+idCategory, [], open);

  const topRef = useRef();
  const buttonRef = useRef();

  const _qs = queryString.stringify({
    fields: "thumbnail_url,name,real_price,price,slug,id",
    name: searchDebounce,
    page: 1,
    limit: 10,
    categories: idCategory || undefined,
  });

  const { data: { data: products = [] } = {}, loading } = useQuery({
    enabled: open,
    queryKey: [_qs],
    keepPreviousData: true,
    queryFn: ({ signal }) => productService.getProducts(`?${_qs}`, signal),
  });

  const querySearchString = queryString.stringify({
    search: searchDebounce || undefined,
  });
  const viewAllLink = useMemo(
    () =>
      (category
        ? generatePath(PATH.category, {
            slug: toSlug(category?.title),
            id: idCategory,
          })
        : generatePath(PATH.products)) + `?${querySearchString}`,
    [category, querySearchString, idCategory]
  );

  useEffect(() => {
    const topHeight = topRef.current?.scrollHeight;
    const buttonHeight = buttonRef.current?.scrollHeight;
    const bodyHeight = size[1] - topHeight - buttonHeight;

    setHeightBody(bodyHeight);
  }, [size]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("hide");
    } else {
      document.body.classList.remove("hide");
    }
  }, [open]);

  return (
    <Portal
      open={open}
      containerClassName={`fixed top-0 left-0 right-0 bottom-0 z-[9999]  ${
        open ? "visible" : "invisible"
      }`}
      overlay
      onClose={onClose}
      containerStyled={{ transition: "all 0.2s ease-in-out" }}
      contentClassName={`modal-dialog modal-dialog-vertical w-full absolute right-0 top-0 bottom-0 h-max ${
        open ? "opacity-100" : "opacity-0"
      }`}
      contentStyle={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "all 0.3s ease-out",
      }}
    >
      <ContentStyle className="modal-content" height={size[1]}>
        <div>
          {/* Close */}
          <button
            type="button"
            className="close !outline-none !border-0"
            data-dismiss="modal"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fe fe-x" aria-hidden="true" />
          </button>
          <div ref={topRef}>
            {/* Header*/}
            <div className="modal-header line-height-fixed font-size-lg">
              <strong className="mx-auto">Search Products</strong>
            </div>
            {/* Body: Form */}
            <div className="modal-body">
              <div className="form-group">
                <label className="sr-only" htmlFor="modalSearchCategories">
                  Categories:
                </label>
                <select
                  className="custom-select"
                  id="modalSearchCategories"
                  value={idCategory}
                  onChange={(e) => setIDCategory(e.target.value)}
                >
                  <option value="" key={0}>
                    All Categories
                  </option>

                  {categoryList?.map((e) => (
                    <option key={e?.id} value={e.id}>
                      {e.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group input-group-merge">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value.trim())}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-border" type="submit">
                    <i className="fe fe-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <BodyStyled
            className="modal-body border-top font-size-sm"
            style={{ height: heightBody, overflowY: "auto" }}
          >
            <SearchProduct
              loading={loading}
              data={products}
              loadingCount={9}
              emptyText="Rất tiếc, không tìm thấy sản phẩm phù hợp với lựa chọn của bạn"
            />
          </BodyStyled>

          {/* Button */}
          <div className="py-4" ref={buttonRef}>
            <Link
              className="btn btn-link px-0 text-reset w-[150px] !p-0 flex justify-center items-center mx-auto bg-black !text-white rounded"
              to={viewAllLink}
              onClick={onClose}
            >
              View All <i className="fe fe-arrow-right ml-2" />
            </Link>
          </div>
        </div>
      </ContentStyle>
    </Portal>
  );
};

export default SearchDrawer;
