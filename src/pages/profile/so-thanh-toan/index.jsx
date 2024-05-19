import EmptyText from "@/components/EmptyText";
import PaymentCard from "@/components/PaymentCard";
import PortalTitle from "@/components/PortalTitle";
import { PATH, PROFILE_TITLE_ID } from "@/config";
import useQuery from "@/hooks/useQuery";
import { userService } from "@/services/user.service";
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const PaymentPage = () => {
  const {
    loading,
    data: { data: paymentList = [] } = {},
    fetchData: refetchPaymentList,
  } = useQuery({
    queryFn: ({ params }) => userService.getPayment(...params),
    limitDuration: 1000,
    onSuccess: (res) => res?.data?.sort((a) => (a.default ? -1 : 0)),
  });

  return (
    <>
      <PortalTitle selector={PROFILE_TITLE_ID}>SỔ THANH TOÁN</PortalTitle>
      <Helmet>
        <title>Sổ thanh toán</title>
      </Helmet>
      <div className="row">
        <PaymentCard
          data={paymentList}
          loading={loading}
          loadingCount={2}
          heightLoading={296}
          refetchPaymentList={refetchPaymentList}
          emptyText="Hiện tại bạn chưa có sổ thanh toán"
        />

        <div className="col-12">
          {/* Button */}
          <Link
            className="btn btn-block btn-lg btn-outline-border"
            to={PATH.profile.newPayment}
          >
            Add Payment Method <i className="fe fe-plus" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
