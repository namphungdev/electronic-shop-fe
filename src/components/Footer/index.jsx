import React from 'react';

const Footer = () => {
  return (
    <footer
      className="bg-dark bg-cover @@classList"
      style={{ backgroundImage: 'url(/img/patterns/pattern-2.svg)' }}
    >
      <div className="py-12 border-bottom border-gray-700">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6">
              {/* Heading */}
              <h5 className="mb-7 text-center text-white">
                Want style Ideas and Treats?
              </h5>
              {/* Form */}
              <form className="mb-11">
                <div className="form-row align-items-start">
                  <div className="col">
                    <input
                      type="email"
                      className="form-control form-control-gray-700 form-control-lg"
                      placeholder="Enter Email *"
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-gray-500 btn-lg">
                      Subscribe
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-3">
              {/* Heading */}
              <h4 className="mb-6 text-white">NHUMAIDAO</h4>
              {/* Social */}
              <ul className="list-unstyled list-inline mb-7 mb-md-0">
                <li className="list-inline-item">
                  <a href="#!" className="text-gray-350">
                    <i className="fab fa-facebook-f" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="text-gray-350">
                    <i className="fab fa-youtube" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="text-gray-350">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="text-gray-350">
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="text-gray-350">
                    <i className="fab fa-medium" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white">Thông tin liên hệ</h6>
              {/* Links */}
              <ul className="list-unstyled mb-7 mb-sm-0">
                <li>
                  <a className="text-gray-300">
                    Thông tin liên hệ
                  </a>
                </li>
                <li>
                  <a className="text-gray-300">
                    Trụ sở chính: 1 Phan Chu Trinh, Phường Tân Thành, Quận Tân Phú
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300"
                    data-toggle="modal"
                    href="#modalSizeChart"
                  >
                    Trụ sở chính: 1 Phan Chu Trinh, Phường Tân Thành, Quận Tân Phú
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300"
                    href="./shipping-and-returns.html"
                  >
                    Trụ sở chính: 1 Phan Chu Trinh, Phường Tân Thành, Quận Tân Phú
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white">Giới thiệu</h6>
              {/* Links */}
              <ul className="list-unstyled mb-7 mb-sm-0">
                <li>
                  <a className="text-gray-300" href="./shop.html">
                   Giới thiệu
                  </a>
                </li>
                <li>
                  <a className="text-gray-300" href="./shop.html">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a className="text-gray-300" href="./shop.html">
                    Tin tức
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white">Hỗ trợ khách hàng</h6>
              {/* Links */}
              <ul className="list-unstyled mb-0">
                <li>
                  <a className="text-gray-300" href="./about.html">
                    Mua hàng Online
                  </a>
                </li>
                <li>
                  <a className="text-gray-300" href="#!">
                    Chính sách bảo hành
                  </a>
                </li>
                <li>
                  <a className="text-gray-300" href="#!">
                    Chính sách đổi trả
                  </a>
                </li>
                <li>
                  <a className="text-gray-300" href="#!">
                    Cam kết mua hàng đảm bảo
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-sm mb-4 mb-sm-0">
              {/* Heading */}
              <h6 className="heading-xxs mb-4 text-white">Map</h6>
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
