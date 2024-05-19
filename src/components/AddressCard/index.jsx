import { PATH } from "@/config";
import useAction from "@/hooks/useAction";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import { cn } from "@/utils";
import withListLoading from "@/utils/withListLoading";
import React from "react";
import { generatePath, useNavigate } from "react-router-dom";
import AddressPaymentCardLoading from "../AddressCardLoading";
import Button from "../Button";

const AddressCard = withListLoading(
  ({
    phone,
    email,
    address,
    province,
    district,
    fullName,
    default: addressDefault,
    _id,
    className,
    ...props
  }) => {
    //=====
    const navigate = useNavigate();
    const { fetchData: editAddressService, loadingEditAddress } = useQuery({
      enabled: false,
      queryFn: ({ params }) => userService.editAddress(...params),
    });
    const onSetDefaultAddress = useAction({
      promise: editAddressService,
      pendingMessage: "Đang cập nhật địa chỉ",
      successMessage: "Đã đặt lại địa chỉ mặc định",
      onSuccess: async (res) => {
        await props?.refetchAddress(res?.data);
        await props?.updateDataDrawer();
      },
    });
    // =====
    const { fetchData: deleteAddressService } = useQuery({
      enabled: false,
      queryFn: ({ params }) => userService.deleteAddress(...params),
    });

    const onDeleteAddress = useAction({
      promise: deleteAddressService,
      pendingMessage: "Đang xóa địa chỉ",
      successMessage: "Đã xóa địa chỉ theo yêu cầu",
      recall: false,
      onSuccess: async () => {
        await refetchAddress();
      },
    });
    return (
      <div
        className={cn("select-none w-full", { "col-12": !props.hideAction })}
        onClick={() => {
          if (props?.onClick) {
            props?.onClick();
            if (props?.selected?._id !== _id) {
              onSetDefaultAddress(_id, { default: true });
            }
          }
        }}
      >
        {/* Card */}
        <div
          className={cn("card card-lg bg-light", { "mb-8": !props.hideAction })}
        >
          <div
            className={cn("card-body", className, {
              "!bg-[#EEFFF3]": props?.selected?._id === _id,
            })}
          >
            {/* Text */}
            <p className="font-size-sm mb-0 leading-[35px]">
              <span className="text-body text-xl font-bold ">{fullName}</span>{" "}
              <br />
              <b>Số điện thoại:</b> {phone} <br />
              <b>Email:</b> {email}
              <br />
              <b>Quận / Huyện:</b> {district} <br />
              <b>Tỉnh / thành phố:</b> {province} <br />
              <b>Địa chỉ:</b> {address}
            </p>
            {addressDefault
              ? !props.hideAction && (
                  <div className="card-action-right-bottom">
                    <div className="color-success cursor-pointer">
                      Địa chỉ mặc định
                    </div>
                  </div>
                )
              : !props.hideAction && (
                  <Button
                    outline
                    className="ml-auto block btn-xs"
                    onClick={() => onSetDefaultAddress(_id, { default: true })}
                    loading={loadingEditAddress}
                  >
                    Đặt làm địa chỉ mặc định
                  </Button>
                )}
            <div className="card-action card-action-right gap-2 flex">
              {/* Button */}
              {!props?.hideAction && (
                <button
                  className="btn btn-xs btn-circle btn-white-primary"
                  onClick={() =>
                    navigate(
                      generatePath(PATH.profile.editAddress, {
                        id: _id,
                      })
                    )
                  }
                >
                  <i className="fe fe-edit-2" />
                </button>
              )}
              {props?.additionElement && props?.additionElement}

              {!addressDefault && !props.hideAction && (
                <button
                  className="btn btn-xs btn-circle btn-white-primary"
                  onClick={() => onDeleteAddress(_id)}
                >
                  <i className="fe fe-trash" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  AddressPaymentCardLoading
);

export default AddressCard;
