import { PATH } from "@/config";
import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
            {/* Icon */}
            <div className="mb-7 font-size-h1">🙁</div>
            {/* Heading */}
            <h2 className="mb-5">404. Không tìm thấy trang</h2>
            {/* Text */}
            <p className="mb-7 text-gray-500">
              Xin lỗi, chúng tôi không thể tìm thấy trang mà bạn đang tìm kiếm. Chúng tôi đề nghị
              bạn trở lại trang chủ.
            </p>
            {/* Button */}
            <Link className="btn btn-dark" to={PATH.home}>
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
