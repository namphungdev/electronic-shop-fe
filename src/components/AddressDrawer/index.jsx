import { PATH } from "@/config";
import useQuery from "@/hooks/useQuery";
import useWindowSize from "@/hooks/useWindowSize";
import { userService } from "@/services/user.service";
import { onCloseDrawer } from "@/stores/drawerReducer";
import { cn } from "@/utils";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AddressCard from "../AddressCard";
import Portal from "../Portal";

const ListStyle = styled.ul`
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  &::-webkit-scrollbar {
    width: 5px;
    background: #fff;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
  }

  ::-webkit-scrollbar-thumb {
    width: 5px;
    background: #ccc;
    border-radius: 10px;
  }
  -webkit-overflow-scrolling: touch;
`;
const ContentStyle = styled.div`
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AddressDrawer = ({ selected, ...props }) => {
  const dispatch = useDispatch();
  const size = useWindowSize();
  const [height, setHeight] = useState();
  const headerRef = useRef();
  const footerRef = useRef();

  const { open } = useSelector((state) => state.drawer.address);
  const onClose = () => dispatch(onCloseDrawer("address"));
  useLayoutEffect(() => {
    const headerHeight = headerRef.current.scrollHeight;
    const footerHeight = footerRef.current.scrollHeight;
    const bodyHeight = size[1] - headerHeight - footerHeight;
    setHeight(bodyHeight);
  }, [size[1]]);
  useEffect(() => {
    if (open) {
      document.body.classList.add("hide");
    } else {
      document.body.classList.remove("hide");
    }
  }, [open]);

  const {
    data: { data: addressList = [] } = {},
    loading,
    fetchData: getAddressList,
    clearPreviousData,
  } = useQuery({
    queryKey: "get-addressList",
    enabled: open,
    queryFn: () => userService.getAddress(),
    onSuccess: (res) => res?.data.sort((e) => (e.default ? -1 : 0)),
    keepPreviousData: true,
    keepStorage: false,
  });

  return (
    <Portal
      open={open}
      containerClassName={`fixed z-50 inset-0 ${
        open ? "visible" : "invisible"
      }`}
      overlay
      onClose={onClose}
      containerStyled={{ transition: "all 0.2s ease-in-out" }}
      contentClassName={cn(
        "modal-dialog modal-dialog-vertical w-full absolute right-0 top-0 bottom-0 h-max",
        { "opacity-100": open },
        { "opacity-0": !open }
      )}
      contentStyle={{
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "all 0.3s ease-out",
      }}
    >
      <ContentStyle
        className="modal-content select-none"
        style={{ height: "100vh" }}
      >
        {/* Close */}
        <button
          type="button"
          className="close !outline-none"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div
          className="modal-header line-height-fixed font-size-lg"
          ref={headerRef}
        >
          <strong className="mx-auto">Select your address</strong>
        </div>
        {/* List group */}
        <ListStyle
          className="list-group list-group-lg list-group-flush"
          style={{ height }}
        >
          <AddressCard
            data={addressList}
            loading={loading}
            hideAction
            selected={selected}
            refetchAddress={props?.updateAddressDefault}
            className={cn(
              "border cursor-pointer bg-white hover:!bg-[#EEFFF3] transition-all"
            )}
            updateDataDrawer={getAddressList}
            onClick={() => {
              clearPreviousData("get-addressList");
              onClose();
            }}
          />
        </ListStyle>
        {/* Buttons */}
        <div className="modal-body mt-auto" ref={footerRef}>
          <Link
            className="btn btn-block btn-outline-dark"
            to={PATH.profile.newAddress}
            onClick={() => {
              onClose();
              document.body.classList.remove("hide");
            }}
          >
            Thêm mới
          </Link>
        </div>
      </ContentStyle>
    </Portal>
  );
};

export default AddressDrawer;
