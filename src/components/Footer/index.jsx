import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-dark bg-cover @@classList"
      style={{ backgroundImage: 'url(/img/patterns/pattern-2.svg)' }}
    >
      <div className="py-12 border-bottom border-gray-700">
        <div className="container">
          <div className='mb-12 border border-white leading-tight p-4 bg-white'>
            <div className="mb-3 text-gray flex">
              <div className='w-72'>Đơn vị bán (Seller):</div>
              <span className="flex-grow ml-12 font-bold">CÔNG TY TNHH TM-DV THIẾT BỊ ĐIỆN TỬ NHƯ MAI ĐÀO</span>
            </div>
            <div className="mb-3 text-gray flex">
              <div className='w-72'>Mã số thuế (Tax Code):</div>
              <span className="flex-grow ml-12 font-bold">0 3 1 7 8 7 7 7 0 6</span>
            </div>
            <div className="mb-3 text-gray flex">
              <div className='w-72'>Địa chỉ (Address):</div>
              <span className="flex-grow ml-12 ">77A Trần Tấn, Phường Tân Sơn Nhì, Quận Tân Phú, TP.HCM</span>
            </div>
            <div className="mb-3 text-gray flex">
              <div className='w-72'>Điện thoại (Tel):</div>
              <span className="flex-grow ml-12 ">0965.117729 / 0876866820</span>
            </div>
            <div className=" text-gray flex">
              <div className='w-72'>Số tài khoản (Account No):</div>
              <span className="flex-grow ml-12 ">STK</span>
            </div>
          </div>

          <div className="row">
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white text-lg">Thông tin liên hệ</h6>
              {/* Links */}
              <ul className="list-disc pl-5 mb-7 mb-sm-0">
                <li className='text-white'>
                  <a className="text-gray-300">
                    Chi nhánh chính: 77A Trần Tấn, Phường Tân Sơn Nhì, Quận Tân Phú, TP.HCM
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white text-lg">Giới thiệu</h6>
              {/* Links */}
              <ul className="list-disc pl-5 mb-7 mb-sm-0">
                <li className='text-white'>
                  <a className="text-gray-300" href="./shop.html">
                    Giới thiệu
                  </a>
                </li>
                <li className='text-white'>
                  <a className="text-gray-300" href="./shop.html">
                    Liên hệ
                  </a>
                </li>
                <li className='text-white'>
                  <a className="text-gray-300" href="./shop.html">
                    Tin tức
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white text-lg">Hỗ trợ khách hàng</h6>
              {/* Links */}
              <ul className="list-disc pl-5 mb-0">
                <li className='text-white'>
                  <a className="text-gray-300" href="./about.html">
                    Mua hàng Online
                  </a>
                </li>
                <li className='text-white'>
                  <a className="text-gray-300" href="#!">
                    Chính sách bảo hành
                  </a>
                </li>
                <li className='text-white'>
                  <a className="text-gray-300" href="#!">
                    Chính sách đổi trả
                  </a>
                </li>
                <li className='text-white'>
                  <a className="text-gray-300" href="#!">
                    Cam kết mua hàng đảm bảo
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white text-lg">Map</h6>
              {/* Links */}
              <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.192844820119!2d106.63248457436676!3d10.79653725882382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529538a127823%3A0x94902c228651620f!2zNzdhIMSQxrDhu51uZyBUcuG6p24gVOG6pW4sIFTDom4gU8ahbiBOaMOsLCBUw6JuIFBow7osIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1716221897210!5m2!1svi!2s" width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* Copyright */}
              <p className="mb-3 mb-md-0 font-size-xxs text-muted">
                © 2019 All rights reserved. Designed by Unvab.
              </p>
            </div>
            <div className="col-auto">
              {/* Payment methods */}
              <img
                className="footer-payment"
                src="/img/payment/mastercard.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/visa.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/amex.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/paypal.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/maestro.svg"
                alt="..."
              />
              <img
                className="footer-payment"
                src="/img/payment/klarna.svg"
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
