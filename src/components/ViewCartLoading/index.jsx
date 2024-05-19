import React from "react";
import Skeleton from "../Skeleton";

const ViewCartLoading = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          {/* Heading */}
          <h3 className="mb-10 text-center">Shopping Cart</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-7">
          {/* List group */}
          <ul className="list-group list-group-lg list-group-flush-x mb-6">
            <li className="list-group-item animate-[fadeIn_1s] flex items-center gap-x-5 pr-0">
              <Skeleton width={18} height={18} />
              <div className="row align-items-center flex-nowrap w-full m-0">
                <Skeleton width={120} height={120} className="flex-shrink-0" />
                <div className="flex-grow px-2 w-full">
                  {/* Title */}
                  <Skeleton height={45} />
                  <br />
                  <span className="card-product-price !mt-9 inline-block">
                    <Skeleton width={140} height={27} />{" "}
                    <Skeleton width={85} height={16} />
                  </span>

                  {/*Footer */}
                  <div className="flex justify-between items-center w-full">
                    <Skeleton width={107} height={30} />
                    <Skeleton width={42} height={20} />
                  </div>
                </div>
              </div>
            </li>
            <div className="flex mt-6 gap-x-2 flex-wrap">
              <div className="w-full">
                <Skeleton height={20} width={50} />
              </div>
              <Skeleton width="50%" height={50} />
              <Skeleton width="10%" height={50} />
            </div>
          </ul>
          {/* Footer */}
        </div>
        <div className="col-12 col-md-5 col-lg-4 offset-lg-1">
          <Skeleton height={464.17} />
        </div>
      </div>
    </div>
  );
};

export default ViewCartLoading;
