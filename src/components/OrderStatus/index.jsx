import currency from "@/utils/currency";
import moment from "moment";
import React from "react";

const OrderStatus = ({ order }) => {
  const { _id, status, total } = order;
  const STATUS = {
    cancel: "Đã hủy",
    pending: "Chờ xác nhận",
    confirm: "Chờ giao hàng",
    shipping: "Đang vận chuyển",
    finished: "Hoàn thành",
  };

  const TITLE_DATE = {
    cancel: "Ngày hủy đơn",
    pending: "Ngày tạo đơn",
    confirm: "Ngày xác nhận",
    shipping: "Ngày vận chuyển",
    finished: "Ngày nhận hàng",
  };

  const TITLE_DATE_FIELD = {
    pending: "createdAt",
    confirm: "confirmDate",
    shipping: "shippingDate",
    finished: "finishedDate",
    cancel: "cancelDate",
  };
  const date = moment(order[TITLE_DATE_FIELD[status]]);

  return (
    <div className="card-body pb-0">
      <div className="card card-sm">
        <div className="card-body bg-light">
          <div className="row">
            <div className="col-6 col-lg-3">
              <h6 className="heading-xxxs text-muted">MÃ ĐƠN HÀNG:</h6>
              {/* Text */}
              <p className="mb-lg-0 font-size-sm font-weight-bold">
                {_id?.slice(-6)}
              </p>
            </div>
            <div className="col-6 col-lg-3">
              <h6 className="heading-xxxs text-muted">{TITLE_DATE[status]}</h6>
              <p className="mb-lg-0 font-size-sm font-weight-bold">
                <time dateTime="2019-09-25">
                  {date.format("DD MMMM, YYYY")}
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
  );
};

export default OrderStatus;
