import Button from "@/components/Button";
import EmptyText from "@/components/EmptyText";
import Pagination from "@/components/Pagination";
import PortalTitle from "@/components/PortalTitle";
import ProductCard from "@/components/ProductCard";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import useQuery from "@/hooks/useQuery";
import useQueryParams from "@/hooks/useQueryParams";
import useScrollTop from "@/hooks/useScrollTop";
import { productService } from "@/services/product.service";
import queryString from "query-string";
import React from "react";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [queryParams] = useQueryParams({
    page: 1,
  });
  const navigate = useNavigate();
  const _qs = queryString.stringify({
    page: queryParams.page,
  });

  const {
    data: { data: wishList = [], paginate: { totalPage } = {} } = {},
    loading,
    fetchData: refetchWishListService,
  } = useQuery({
    queryKey: `wishList-${_qs}`,
    queryFn: () => productService.getWishlist(`?${_qs}`),
    keepPreviousData: true,
    keepStorage: false,
  });
  useScrollTop(
    [queryParams.page],
    document.querySelector(PROFILE_TITLE_ID)?.getBoundingClientRect().top +
      window.scrollY
  );
  return (
    <>
      <PortalTitle selector={PROFILE_TITLE_ID}>Sản phẩm yêu thích</PortalTitle>
      {/* Products */}
      <div className="row">
        <ProductCard
          loading={loading}
          data={wishList}
          loadingCount={6}
          empty={
            <div className="col-12">
              <EmptyText>Hiện tại bạn chưa có sản phẩm yêu thích</EmptyText>
              <Button
                onClick={() => navigate(PATH.products)}
                className="mt-5 btn-sm text-xs"
              >
                Đi đến trang sản phẩm
              </Button>
            </div>
          }
          fetchWishList={refetchWishListService}
          showWishList={false}
        />
      </div>

      {!loading && <Pagination totalPage={totalPage} />}
    </>
  );
};

export default WishlistPage;
