import OrderCard from "@/components/OrderCard";
import Pagination from "@/components/Pagination";
import PortalTitle from "@/components/PortalTitle";
import Skeleton from "@/components/Skeleton";
import Tab from "@/components/Tab";
import { PROFILE_TITLE_ID } from "@/config";
import useQuery from "@/hooks/useQuery";
import useQueryParams from "@/hooks/useQueryParams";
import { orderService } from "@/services/order.service";
import createArray from "@/utils/createArray";
import withListLoading from "@/utils/withListLoading";
import { Badge } from "antd";
import queryString from "query-string";
import React from "react";
import styled from "styled-components";

const OrderPage = () => {
  const [params] = useQueryParams();
  const _qs = queryString.stringify({
    ...(params?.tab &&
      params?.tab !== "all" && {
        status: params?.tab,
      }),
    page: params?.page,
  });
  const {
    data: { data: orderList = [], paginate = {} } = {},
    loading: loadingOrderList,
  } = useQuery({
    queryKey: `orderList-${_qs}`,
    queryFn: () => orderService.getAllOrder(_qs ? `?${_qs}` : ""),
    keepPreviousData: true,
    keepStorage: false,
  });

  const queries = [
    { key: "countPending", status: "pending" },
    { key: "countConfirm", status: "confirm" },
    { key: "countShipping", status: "shipping" },
  ];

  const counts = {};

  for (const { key, status } of queries) {
    const { data: { count } = {} } = useQuery({
      queryFn: () => orderService.count(`?status=${status}`),
    });
    counts[key] = count;
  }
  const { countConfirm, countPending, countShipping } = counts;

  const queryList = [
    "all",
    "pending",
    "confirm",
    "shipping",
    "finished",
    "cancel",
  ];

  return (
    <>
      <PortalTitle selector={PROFILE_TITLE_ID}>Theo dõi đơn hàng</PortalTitle>

      <Tab callApiOnActive queryList={queryList} keySearch="tab">
        <div className="nav mb-10 select-none">
          <Tab.Title className="nav-link">Tất cả đơn</Tab.Title>
          <Badge count={countPending} size="large" offset={[-15, 0]}>
            <Tab.Title className="nav-link">Đang xử lý</Tab.Title>
          </Badge>
          <Badge count={countConfirm} size="large" offset={[-15, 0]}>
            <Tab.Title className="nav-link">Đã xác nhận</Tab.Title>
          </Badge>
          <Badge count={countShipping} size="large" offset={[-15, 0]}>
            <Tab.Title className="nav-link">Đang vận chuyển</Tab.Title>
          </Badge>
          <Tab.Title className="nav-link">Đã giao</Tab.Title>
          <Tab.Title className="nav-link">Đã hủy</Tab.Title>
        </div>

        <div className="tab-content">
          {createArray(6).map((_, id) => (
            <Tab.Content className="tab-pane fade" key={id} index={id}>
              <ListOrderItem
                data={orderList}
                loading={loadingOrderList}
                loadingCount={3}
                empty={
                  <div className="flex items-center flex-col gap-5 text-center">
                    <img width={200} src="/img/empty-order.png" alt="" />
                    <p>Chưa có đơn hàng nào</p>
                  </div>
                }
              />
            </Tab.Content>
          ))}
        </div>
        {!loadingOrderList && (
          <Pagination
            totalPage={paginate?.totalPage}
            style={{ display: loadingOrderList ? "none" : "flex" }}
          />
        )}
      </Tab>
    </>
  );
};
const OrderCardLoadingStyle = styled.div`
  .skeleton {
    border-radius: 4px;
  }
`;
const OrderCardLoading = () => {
  return (
    <OrderCardLoadingStyle className="card card-lg mb-5 border">
      <div className="card-body pb-0">
        <div className="card card-sm">
          <Skeleton height={87.7} />
        </div>
      </div>
      <div className="card-footer">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="form-row mb-4 mb-lg-0 gap-[10px]">
              <Skeleton width={63.83} height={63.83} className="ml-[10px]" />
              <Skeleton width={63.83} height={63.83} />
              <Skeleton width={63.83} height={63.83} />
              <Skeleton width={63.83} height={63.83} />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="flex justify-end gap-3">
              <Skeleton width={82} height={40} />
              <Skeleton width={82} height={40} />
            </div>
          </div>
        </div>
      </div>
    </OrderCardLoadingStyle>
  );
};
const ListOrderItem = withListLoading(OrderCard, OrderCardLoading);
export default OrderPage;
