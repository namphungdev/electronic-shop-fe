import { cn } from "@/utils";
import React from "react";
import Skeleton from "../Skeleton";

const ProductCardLoading = ({ className }) => {
  return (
    <div
      className={cn(
        "col-6 col-md-4 product-loading product-card-loading",
        className
      )}
    >
      <div className="card mb-7">
        <div className="card-img">
          <Skeleton className="absolute left-0 top-0" />
        </div>
        <div className="card-body px-0 max-h-[207px] h-full overflow-hidden">
          <div className="font-size-xs">
            <Skeleton width={175} height={20} />
          </div>
          <Skeleton className="card-product-name" height={60} />
          <div className="card-product-rating gap-x-2 max-w-[80%] h-6">
            <Skeleton width="15%" />
            <Skeleton width="30%" />
            <Skeleton width="15%" />
          </div>
          <div className="card-product-price flex gap-x-2">
            <Skeleton width="60%" />
            <Skeleton width="40%" height={20} className="mt-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardLoading;
