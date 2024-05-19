import Button from "@/components/Button";
import Skeleton from "@/components/Skeleton";
import { PATH } from "@/config";
import useQuery from "@/hooks/useQuery";
import { orderService } from "@/services/order.service";
import currency from "@/utils/currency";
import moment from "moment";
import React from "react";
import { generatePath, Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: { data: orderDetail = {} } = {}, loading } = useQuery({
    enabled: !!id,
    queryFn: ({ signal }) => orderService.getOrderDetail(id, signal),
    onError: () => {
      toast.error("Đơn hàng không tồn tại");
      navigate(PATH.profile.order);
    },
  });

  const PAYMENT = {
    money: "Thanh toán khi nhận hàng",
    card: "Thanh toán bằng thẻ",
  };

  const SHIPPING = {
    "giao-hang-nhanh": "Giao hàng nhanh",
    "mien-phi": "Miễn phí",
    "tieu-chuan": "Tiêu chuẩn",
  };
  const {
    _id,
    total,
    finishedDate,
    createdAt,
    tax,
    subTotal,
    status,
    promotion,
    shipping,
    totalQuantity,
    payment,
    listItems,
  } = orderDetail;
  const date = moment(status !== "finished" ? createdAt : finishedDate);
  const checkPayback = moment(finishedDate).add(7, "days") >= moment();
  const STATUS = {
    cancel: "Đã hủy",
    pending: "Đang xử lý",
    confirm: "Đã xác nhận",
    shipping: "Đang vận chuyển",
    finished: "Đã giao",
  };
  return loading ? (
    <OrderDetailPageLoading />
  ) : (
    <>
      {/* Order */}
      <div className="card card-lg mb-5 border">
        <div className="card-body pb-0">
          <div className="card card-sm">
            <div className="card-body bg-light">
              <div className="row">
                <div className="col-6 col-lg-3">
                  <h6 className="heading-xxxs text-muted">Mã đơn hàng:</h6>
                  <p className="mb-lg-0 font-size-sm font-weight-bold">
                    {_id?.slice(-6)}
                  </p>
                </div>
                <div className="col-6 col-lg-3">
                  <h6 className="heading-xxxs text-muted">
                    {status !== "finished" ? "Ngày tạo đơn:" : "Ngày giao hàng"}
                  </h6>
                  <p className="mb-lg-0 font-size-sm font-weight-bold">
                    <time dateTime="2019-10-01">
                      {date?.format("DD MMMM, YYYY")}
                    </time>
                  </p>
                </div>
                <div className="col-6 col-lg-3">
                  <h6 className="heading-xxxs text-muted">Trạng thái:</h6>
                  <p className="mb-0 font-size-sm font-weight-bold">
                    {STATUS[status]}
                  </p>
                </div>
                <div className="col-6 col-lg-3">
                  <h6 className="heading-xxxs text-muted">Tổng tiền:</h6>
                  <p className="mb-0 font-size-sm font-weight-bold">
                    {currency(total)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <h6 className="mb-7">Order Items ({totalQuantity})</h6>
          <hr className="my-5" />
          <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
            {listItems?.map((e) => (
              <li className="list-group-item" key={e?.productId}>
                <div className="row align-items-center gap-x-5 justify-between">
                  <div className="flex flex-row w-full min-[990px]:max-w-[70%] gap-x-5">
                    <Link
                      to={generatePath(PATH.productDetail, {
                        slug: e?.product?.slug,
                      })}
                      className="flex-shrink-0 w-[100px]"
                    >
                      <img
                        src={e?.product?.thumbnail_url}
                        alt="..."
                        className="img-fluid"
                      />
                    </Link>
                    <p className="mb-4 font-size-sm font-weight-bold flex-grow">
                      <Link
                        to={generatePath(PATH.productDetail, {
                          slug: e?.product?.slug,
                        })}
                        className="text-black"
                      >
                        {e?.product?.name} ({e?.quantity})
                      </Link>
                      <br />
                      <span className="text-muted mt-2 inline-block">
                        {currency(e?.product?.price)}
                      </span>
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {checkPayback && ["finished"].includes(status) && (
                      <Button className="btn-sm btn-block normal-case" outline>
                        Đổi trả
                      </Button>
                    )}
                    {["finished", "cancel"].includes(status) && (
                      <Button
                        className="btn-sm btn-block normal-case"
                        outline
                        onClick={() =>
                          navigate(
                            generatePath(PATH.productDetail, {
                              slug: e?.product?.slug,
                            })
                          )
                        }
                      >
                        Mua lại
                      </Button>
                    )}
                    {["pending"].includes(status) && (
                      <Button className="btn-sm btn-block normal-case" outline>
                        Hủy đơn
                      </Button>
                    )}
                    {status === "finished" && !e?.review && (
                      <Link
                        to={`/${e?.product?.slug}`}
                        state={{ orderId: _id }}
                        className="btn btn-sm btn-block btn-outline-dark"
                      >
                        Viết review
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Total */}
      <div className="card card-lg mb-5 border">
        <div className="card-body">
          {/* Heading */}
          <h6 className="mb-7">Order Total</h6>
          {/* List group */}
          <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
            <li className="list-group-item d-flex">
              <span>Subtotal</span>
              <span className="ml-auto">{currency(subTotal)}</span>
            </li>
            <li className="list-group-item d-flex">
              <span>Tax</span>
              <span className="ml-auto">{currency(tax)}</span>
            </li>
            <li className="list-group-item d-flex">
              <span>Promotion</span>
              <span className="ml-auto">
                {promotion ? currency(-promotion?.discount) : 0}
              </span>
            </li>
            <li className="list-group-item d-flex">
              <span>Shipping</span>
              <span className="ml-auto">
                {shipping?.shippingPrice
                  ? currency(shipping?.shippingPrice)
                  : 0}
              </span>
            </li>
            <li className="list-group-item d-flex font-size-lg font-weight-bold">
              <span>Total</span>
              <span className="ml-auto">{currency(total)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="card card-lg border">
        <div className="card-body">
          <h6 className="mb-7">Thông tin đơn hàng:</h6>
          <div className="row">
            <div className="col-12 col-md-4">
              <p className="mb-4 font-bold">Thông tin khách hàng:</p>
              <div className="mb-7 mb-md-0 text-gray-500">
                <span className="font-bold block">Họ và tên:</span>
                {shipping?.fullName}
                <span className="font-bold block">Số điện thoại:</span>
                {shipping?.phone}
                <span className="font-bold block">Địa chỉ email:</span>
                {shipping?.email}
                <span className="font-bold block">Thành phố/ tỉnh:</span>
                {shipping?.province}
                <span className="font-bold block">Quận/ huyện:</span>
                {shipping?.district}
                <span className="font-bold block">Số nhà:</span>
                {shipping?.address}
              </div>
            </div>
            <div className="col-12 col-md-4">
              <p className="mb-4 font-bold">Phương thức vận chuyển</p>
              <p className="mb-7 text-gray-500">
                {SHIPPING[shipping?.shippingMethod]} <br />
                (5 - 7 days)
              </p>
              <p className="mb-4 font-bold">Payment Method:</p>
              <p className="mb-0 text-gray-500">
                {PAYMENT[payment?.paymentMethod]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CartStyle = styled.div`
  .skeleton {
    border-radius: 4px;
  }
`;
const OrderDetailPageLoading = () => {
  return (
    <>
      <CartStyle className="card card-lg mb-5 border">
        <div className="card-body pb-0">
          <div className="card card-sm">
            <Skeleton height={87.7} />
          </div>
        </div>
        <div className="card-footer">
          <Skeleton width={135} height={24} />
          <hr className="my-5" />
          <ul className="list-group list-group-lg list-group-flush-y list-group-flush-x">
            <li className="list-group-item">
              <div className="row align-items-center gap-x-5 justify-between">
                <div className="flex flex-row w-full min-[990px]:max-w-[70%] gap-x-5">
                  <Skeleton width={100} height={114} />
                  <div className="mb-4 flex-grow">
                    <Skeleton height={66} />
                    <Skeleton height={20} width={50} marginTop={10} />
                  </div>
                </div>

                <div className="flex-shrink-0 flex flex-col gap-y-2">
                  <Skeleton width={125} height={50} />
                  <Skeleton width={125} height={50} />
                  <Skeleton width={125} height={50} />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </CartStyle>

      <CartStyle className="card card-lg mb-5 border max-h-[445px]">
        <div className="card-body">
          {/* Heading */}
          <Skeleton width={100} height={24} />
          {/* List group */}
          <ul className="list-group list-group-sm list-group-flush-y list-group-flush-x">
            <li className="list-group-item d-flex">
              <Skeleton height={30} />
            </li>
            <li className="list-group-item d-flex">
              <Skeleton height={30} />
            </li>
            <li className="list-group-item d-flex">
              <Skeleton height={30} />
            </li>
            <li className="list-group-item d-flex">
              <Skeleton height={30} />
            </li>
            <li className="list-group-item d-flex font-size-lg font-weight-bold">
              <Skeleton height={30} />
            </li>
          </ul>
        </div>
      </CartStyle>

      <CartStyle className="card card-lg border">
        <div className="card-body">
          <Skeleton width={180} height={24} />
          <div className="row">
            <div className="col-12 col-md-4">
              <Skeleton width={160} height={24} />
              <div className="mb-7 mb-md-0 text-gray-500">
                <Skeleton height={300} />
              </div>
            </div>
            <div className="col-12 col-md-4">
              <Skeleton width={180} height={24} />
              <Skeleton height={135} />
            </div>
          </div>
        </div>
      </CartStyle>
    </>
  );
};

export default OrderDetailPage;
