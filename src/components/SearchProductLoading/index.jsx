import React from "react";
import Skeleton from "../Skeleton";

const SearchProductLoading = () => {
  return (
    <div className="row align-items-center position-relative mb-5">
      <div className="col-4 col-md-3 img-cate">
        {/* Image */}
        <Skeleton className="rounded" />
      </div>
      <div className="col position-static">
        {/* Text */}
        <p className="mb-0 font-weight-bold">
          <Skeleton height={10} className="rounded" />
          <Skeleton height={10} className="rounded" />
          <Skeleton height={20} marginTop={20} width={80} className="rounded" />
        </p>
      </div>
    </div>
  );
};
export default SearchProductLoading;
