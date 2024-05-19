import AddressCard from "@/components/AddressCard";
import EmptyText from "@/components/EmptyText";
import PortalTitle from "@/components/PortalTitle";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import useQuery from "@/hooks/useQuery";
import useScrollTop from "@/hooks/useScrollTop";
import { userService } from "@/services/user.service";
import React from "react";
import { Link } from "react-router-dom";

const AddressPage = () => {
  // useScrollTop();
  const {
    data: { data: addressList = [] } = {},
    loading,
    fetchData: refetchAddress,
  } = useQuery({
    queryFn: () => userService.getAddress(),
    onSuccess: (res) => {
      res?.data.sort((e) => (e.default ? -1 : 0));
    },
  });
  return (
    <div className="row">
      <PortalTitle selector={PROFILE_TITLE_ID}>SỔ ĐỊA CHỈ</PortalTitle>
      <AddressCard
        loadingCount={2}
        loading={loading}
        data={addressList}
        refetchAddress={refetchAddress}
        emptyText="Hiện tại bạn chưa cung cấp địa chỉ, vui lòng thêm địa chỉ ở bên
                dưới"
      />
      <div className="col-12">
        {/* Button */}
        <Link
          className="btn btn-block btn-lg btn-outline-border"
          to={PATH.profile.newAddress}
        >
          Add Address <i className="fe fe-plus" />
        </Link>
      </div>
    </div>
  );
};

export default AddressPage;
