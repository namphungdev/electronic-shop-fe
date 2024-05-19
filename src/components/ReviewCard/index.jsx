import { avatarDefault } from "@/utils";
import createArray from "@/utils/createArray";
import withListLoading from "@/utils/withListLoading";
import moment from "moment";
import React from "react";
import Skeleton from "../Skeleton";
const ReviewCard = ({ content, createdAt, star, user }) => {
  return (
    <div className="review">
      <div className="review-body">
        <div className="row">
          <div className="col-12 col-md-auto">
            {/* Avatar */}
            <div className="avatar avatar-xxl mb-6 mb-md-0">
              <span className="avatar-title rounded-circle overflow-hidden">
                <img
                  src={user?.avatar || avatarDefault}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </span>
            </div>
          </div>
          <div className="col-12 col-md">
            {/* Header */}
            <div className="row mb-6">
              <div className="col-12">
                {/* Rating */}
                <div
                  className="rating font-size-sm text-dark"
                  data-value={star}
                >
                  {createArray(5).map((_, id) => (
                    <div className="rating-item" key={id}>
                      <i className="fas fa-star" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12">
                {/* Time */}
                <span className="font-size-xs text-muted">
                  {user?.name},{" "}
                  <time dateTime="2019-07-25">
                    {moment(createdAt).format("DD MMM, YYYY")}
                  </time>
                </span>
              </div>
            </div>
            {/* Text */}
            <p className="text-gray-500">{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewCardLoading = () => {
  return (
    <div className="review">
      <div className="review-body">
        <div className="row">
          <div className="col-12 col-md-auto">
            <div className="avatar avatar-xxl mb-6 mb-md-0">
              <span className="avatar-title rounded-circle overflow-hidden">
                <Skeleton />
              </span>
            </div>
          </div>
          <div className="col-12 col-md">
            <div className="row mb-6">
              <div className="col-12">
                <Skeleton width={84} height={23} />
              </div>
              <div className="col-12">
                <span className="font-size-xs text-muted">
                  <Skeleton width={116} height={18} />
                </span>
              </div>
            </div>
            {/* Text */}
            <Skeleton width={200} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReviewCardList = withListLoading(ReviewCard, ReviewCardLoading);
export default ReviewCard;
