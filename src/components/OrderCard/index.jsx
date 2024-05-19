import { PATH } from "@/config";
import moment from "moment";
import React from "react";
import { generatePath, Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import OrderStatus from "../OrderStatus";

const OrderCard = ({ ...props }) => {
  const navigate = useNavigate();
  const { finishedDate, status, listItems, _id } = props || {};
  const checkPayback = moment(finishedDate).add(7, "days") >= moment();
  
  return (
    <div className="card card-lg mb-5 border">
      <OrderStatus order={props} />
      <div className="card-footer">
        <div className="row align-items-center">
          <div className="col-12 col-lg-6">
            <div className="form-row mb-4 mb-lg-0">
              {listItems?.slice(0, 3)?.map((e) => (
                <div className="col-3" key={e?.productId}>
                  <div
                    className="embed-responsive embed-responsive-1by1 bg-cover"
                    style={{
                      backgroundImage: `url(${e?.product?.thumbnail_url})`,
                    }}
                  />
                </div>
              ))}
              {listItems?.length === 4 && (
                <div className="col-3" key={listItems?.[3]?.product?.productId}>
                  <div
                    className="embed-responsive embed-responsive-1by1 bg-cover"
                    style={{
                      backgroundImage: `url(${listItems?.[3]?.product?.thumbnail_url})`,
                    }}
                  />
                </div>
              )}
              {listItems?.length > 4 && (
                <div className="col-3" key={listItems?.[4]?.product?.productId}>
                  <div className="embed-responsive embed-responsive-1by1 bg-light">
                    <a className="embed-responsive-item embed-responsive-item-text text-reset">
                      <div className="font-size-xxs font-weight-bold">
                        +{listItems?.length - 3} <br /> ảnh
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="flex justify-end gap-3">
              {checkPayback && ["finished"].includes(status) && (
                <Button className="btn-xs normal-case" outline>
                  Đổi trả
                </Button>
              )}
              {["finished", "cancel"].includes(status) && (
                <Button
                  className="btn-xs normal-case"
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
                <Button className="btn-xs normal-case" outline>
                  Hủy đơn
                </Button>
              )}

              <Link
                className="btn btn-xs btn-outline-dark"
                to={generatePath(PATH.profile.orderDetail, {
                  id: _id,
                })}
              >
                Xem chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
