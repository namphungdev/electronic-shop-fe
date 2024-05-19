import { PATH } from "@/config";
import store from "@/stores";
import { logoutAction } from "@/stores/auth/authReducer";
import { cn } from "@/utils";
import handleError from "@/utils/handleError";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileNav = [
  {
    nav: "Theo dõi đơn hàng",
    to: PATH.profile.order,
  },
  {
    nav: "Thông tin cá nhân",
    to: PATH.profile.index,
    end: true,
  },
  {
    nav: " Sản phẩm yêu thích",
    to: PATH.profile.wishList,
  },
  {
    nav: "Số địa chỉ",
    to: PATH.profile.address,
  },
  {
    nav: " Sổ thanh toán",
    to: PATH.profile.payment,
  },
  {
    nav: "Đăng xuất",
    to: "/",
    onClick: async (e) => {
      e.preventDefault();
      toast.dismiss();
      store.dispatch(logoutAction());
      toast.warning("Bạn đã đăng xuất khỏi tài khoản");
    },
  },
];

const ProfileLayout = () => {
  return (
    <>
      <div>
        <nav className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Breadcrumb */}
                <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                  <li className="breadcrumb-item">
                    <a className="text-gray-400" href="index.html">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb-item active">My Account</li>
                </ol>
              </div>
            </div>
          </div>
        </nav>
        {/* CONTENT */}
        <section className="pt-7 pb-12">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                {/* Heading */}
                <h3
                  className="mb-10 uppercase font-semibold"
                  id="profile-title"
                ></h3>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-md-3">
                {/* Nav */}
                <nav className="mb-10 mb-md-0">
                  <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                    {ProfileNav.map((e, id) => (
                      <NavLink
                        key={id}
                        className={cn(
                          "list-group-item list-group-item-action dropright-toggle"
                          // ({ isActive }) => ({ active: isActive })
                        )}
                        end={e?.end}
                        to={e?.to || ""}
                        onClick={e?.onClick}
                      >
                        {e.nav}
                      </NavLink>
                    ))}
                  </div>
                </nav>
              </div>

              <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
                <Outlet />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProfileLayout;
