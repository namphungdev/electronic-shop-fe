import { cn } from "@/utils";
import React from "react";
import Skeleton from "../Skeleton";

const AddressPaymentCardLoading = ({
  height: heightLoading = 274,
  hideAction,
}) => {
  return (
    <div className={cn({ "col-12": !hideAction })}>
      {/* Card */}
      <div
        className={cn("card card-lg  justify-center", {
          "mb-8 bg-light": !hideAction,
          "border bg-white": hideAction,
        })}
        style={{ height: heightLoading }}
      >
        <div className="card-body">
          {/* Text */}
          <p className="font-size-sm mb-0 leading-[35px]">
            <Skeleton
              borderRadius={4}
              display="block"
              height={20}
              width="85%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="75%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="55%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="40%"
            />
            <Skeleton
              borderRadius={4}
              display="block"
              marginTop={20}
              height={20}
              width="35%"
            />
          </p>
          {/* {addressDefault && (
            <div className="card-action-right-bottom">
              <div className="color-success cursor-pointer">
                Địa chỉ mặc định
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AddressPaymentCardLoading;
