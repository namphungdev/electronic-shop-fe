import React from "react";

const ShippingPage = () => {
  return (
    <>
      <nav className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Breadcrumb */}
              <ol className="breadcrumb mb-0 font-size-xs text-gray-400">
                <li className="breadcrumb-item">
                  <a className="text-gray-400" href="index.html">
                    Trang chủ
                  </a>
                </li>
                <li className="breadcrumb-item active">
                  Thông tin
                </li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      {/* CONTENT */}
      <section className="pt-7 pb-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10 font-size-lg text-gray-500">
              {/* Heading */}
              <h3 className="mb-10 text-center text-body">
                Thông tin
              </h3>
              <p>
                <span className="font-bold">
                CỬA HÀNG THIẾT BỊ ĐIỆN TỬ NHƯ MAI ĐÀO: 
                </span>
                {" "}chuyên lĩnh vực thương mại vật tư điện, cung cấp dây cáp điện, vật tư điện cho lưới điện, công trình xây dựng cao tầng, nhà dân dụng và các cửa hàng, đại lý bán sỉ và lẻ trên toàn quốc. Dây cáp điện, thiết bị điện, thiết bị chiếu sáng, quạt điện dân dụng và một số các thiết bị ngoại nhập khác.
              </p>

              <p>
                Dịch vụ chuyên cung cấp
                <br />
                + Thiết bị điện - thiết bị văn phòng
                <br />
                + Camera an ninh
                <br />
                + Sửa chửa - cài đặt - cung cấp máy  cũ và máy mới
                <br />
                + Thi công lắp đặt hệ thống điện - camera an ninh
              </p>

              <p>
                Khu vực: TPHCM và các khu vực lân cận
              </p>
              
              <img
                style={{ width: '100%', height: 'auto' }}
                srcSet="/img/about.png"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShippingPage;
