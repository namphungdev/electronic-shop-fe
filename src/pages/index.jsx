import ListProducts from '@/components/ListProducts';
import Slider from '@/components/Slider';
import Tab from '@/components/Tab';
import useScrollTop from '@/hooks/useScrollTop';
import createArray from '@/utils/createArray';
import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  useScrollTop();

  return (
    <>
      <section>
        <div
          className="row no-gutters d-block d-lg-flex flickity flickity-lg-none"
          data-flickity='{"watchCSS": true}'
        >
          {/* Item */}
          <div
            className="col-12 col-md-6 col-lg-4 d-flex flex-column bg-cover"
            style={{ backgroundImage: 'url(/img/covers/cover-1.jpg)' }}
          >
            <div
              className="card bg-dark-5 bg-hover text-white text-center"
              style={{ minHeight: 470 }}
            >
              <div className="card-body mt-auto mb-n11 py-8">
                {/* Heading */}
                <h1 className="mb-0 font-weight-bolder">Women</h1>
              </div>
              <div className="card-body mt-auto py-8">
                {/* Button */}
                <a className="btn btn-white stretched-link" href="/san-pham">
                  Shop Women <i className="fe fe-arrow-right ml-2" />
                </a>
              </div>
            </div>
          </div>
          {/* Card */}
          <div
            className="col-12 col-md-6 col-lg-4 d-flex flex-column bg-cover"
            style={{ backgroundImage: 'url(/img/covers/cover-2.jpg)' }}
          >
            <div
              className="card bg-dark-5 bg-hover text-white text-center"
              style={{ minHeight: 470 }}
            >
              <div className="card-body mt-auto mb-n11 py-8">
                {/* Heading */}
                <h1 className="mb-0 font-weight-bolder">Men</h1>
              </div>
              <div className="card-body mt-auto py-8">
                {/* Button */}
                <a className="btn btn-white stretched-link" href="/san-pham">
                  Shop Men <i className="fe fe-arrow-right ml-2" />
                </a>
              </div>
            </div>
          </div>
          {/* Card */}
          <div
            className="col-12 col-md-6 col-lg-4 d-flex flex-column bg-cover"
            style={{ backgroundImage: 'url(/img/covers/cover-3.jpg)' }}
          >
            <div
              className="card bg-dark-5 bg-hover text-white text-center"
              style={{ minHeight: 470 }}
            >
              <div className="card-body mt-auto mb-n11 py-8">
                {/* Heading */}
                <h1 className="mb-0 font-weight-bolder">
                  Đồ chơi, Mẹ &amp; Bé
                </h1>
              </div>
              <div className="card-body mt-auto py-8">
                {/* Button */}
                <a className="btn btn-white stretched-link" href="/san-pham">
                  Shop Kids <i className="fe fe-arrow-right ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FEATURES */}
      <section className="pt-7">
        <div className="container">
          <div className="row pb-7 border-bottom">
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-lg-0">
                {/* Icon */}
                <i className="fe fe-truck font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="heading-xxs mb-1">Free shipping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    From all orders over $100
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-lg-0">
                {/* Icon */}
                <i className="fe fe-repeat font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Free returns</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    Return money within 30 days
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex mb-6 mb-md-0">
                {/* Icon */}
                <i className="fe fe-lock font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Secure shopping</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    You're in safe hands
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              {/* Item */}
              <div className="d-flex">
                {/* Icon */}
                <i className="fe fe-tag font-size-lg text-primary" />
                {/* Body */}
                <div className="ml-6">
                  {/* Heading */}
                  <h6 className="mb-1 heading-xxs">Over 10,000 Styles</h6>
                  {/* Text */}
                  <p className="mb-0 font-size-sm text-muted">
                    We have everything you need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEST PICKS */}

      {/* TOP SELLERS */}
      <section className="py-12">
        <div className="container">
          <Tab
            queryList={['do-dien-tu', 'do-gia-dung', 'san-pham-khuyen-mai']}
            keySearch="tab"
            callApiOnActive
          >
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                <h2 className="mb-4 text-center">Sản phẩm nổi bật</h2>
                {/* <div className="nav justify-content-center mb-10">
                  <Tab.Title className="nav-link">Đồ điện tử</Tab.Title>
                  <Tab.Title className="nav-link">Đồ gia dụng</Tab.Title>
                  <Tab.Title className="nav-link">
                    Sản phẩm khuyến mãi
                  </Tab.Title>
                </div> */}
              </div>
            </div>
            <div className="tab-content">
              {createArray(3).map((_, id) => (
                <Tab.Content
                  className="tab-pane animate-[fadeIn_1s]"
                  key={id}
                  index={id}
                >
                  <ListProducts id={[4221, 1883]?.[id]} />
                </Tab.Content>
              ))}
            </div>
          </Tab>
        </div>
      </section>
      {/* COUNTDOWN */}
      <section
        className="py-13 bg-cover"
        style={{ backgroundImage: 'url(/img/covers/cover-4.jpg)' }}
      >
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-12 col-md-8 col-lg-6">
              {/* Heading */}
              <h3 className="mb-7">
                Giãm hơn 50% <br />
                Bộ sưu tập mùa hè
              </h3>
              {/* Counter */}
              <div
                className="d-flex mb-9"
                data-countdown
                data-date="Dec 5, 2023 15:37:25"
              >
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-days
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Days</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder text-primary">
                    :
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-hours
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Hours</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder text-primary">
                    :
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-minutes
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Minutes</div>
                </div>
                <div className="px-1 px-md-4">
                  <div className="font-size-h2 font-weight-bolder text-primary">
                    :
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="font-size-h1 font-weight-bolder text-primary"
                    data-seconds
                  >
                    00
                  </div>
                  <div className="heading-xxs text-muted">Seconds</div>
                </div>
              </div>
              {/* Button */}
              <a className="btn btn-dark" href="shop.html">
                Mua ngay <i className="fe fe-arrow-right ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* REVIEWS */}
      <section className="py-12">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-6 text-center">
              {/* Preheading */}
              <h6 className="heading-xxs mb-3 text-gray-400">
                What buyers say
              </h6>
              {/* Heading */}
              <h2 className="mb-10">Latest buyers Reviews</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Slider
                className="select-none !pb-20"
                slidesPerView={1}
                spaceBetween={32}
                loop
                grabCursor
                speed={600}
                pagination={{ clickable: true }}
                breakpoints={{
                  //min-width
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-13.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Shoes
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Low top Sneakers
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={3}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        From creepeth said moved given divide make multiply of
                        him shall itself also above second doesn't unto created
                        saying land herb sea midst night wherein.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Logan Edwards,{' '}
                        <time dateTime="2019-06-01">01 Jun 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-14.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Dresses
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Cotton print Dress
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={5}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        God every fill great replenish darkness unto. Very open.
                        Likeness their that light. Given under image to. Subdue
                        of shall cattle day fish form saw spirit and given
                        stars, us you whales may, land, saw fill unto.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Jane Jefferson,{' '}
                        <time dateTime="2019-05-29">29 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-15.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          T-shirts
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Oversized print T-shirt
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={4}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        Fill his waters wherein signs likeness waters. Second
                        light gathered appear sixth fourth, seasons behold
                        creeping female.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Darrell Baker,{' '}
                        <time dateTime="2019-05-18">18 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-10.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Bags &amp; Accessories
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Suede cross body Bag
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={4}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        God every fill great replenish darkness unto. Very open.
                        Likeness their that light. Given under image to. Subdue
                        of shall cattle day fish form saw spirit and given
                        stars.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Pavel Doe,{' '}
                        <time dateTime="2019-05-29">29 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-13.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Shoes
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Low top Sneakers
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={3}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        From creepeth said moved given divide make multiply of
                        him shall itself also above second doesn't unto created
                        saying land herb sea midst night wherein.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Logan Edwards,{' '}
                        <time dateTime="2019-06-01">01 Jun 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
                <div className="card-lg card border">
                  <div className="card-body">
                    <div className="row align-items-center mb-6">
                      <div className="col-4">
                        <img
                          src="/img/products/product-14.jpg"
                          alt="..."
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-8 ml-n2">
                        <a className="font-size-xs text-muted" href="shop.html">
                          Dresses
                        </a>
                        <a
                          className="d-block font-weight-bold text-body"
                          href="product.html"
                        >
                          Cotton print Dress
                        </a>
                        <div
                          className="rating font-size-xxs text-warning"
                          data-value={5}
                        >
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                          <div className="rating-item">
                            <i className="fas fa-star" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <blockquote className="mb-0">
                      <p className="text-muted">
                        God every fill great replenish darkness unto. Very open.
                        Likeness their that light. Given under image to. Subdue
                        of shall cattle day fish form saw spirit and given
                        stars, us you whales may, land, saw fill unto.
                      </p>
                      <footer className="font-size-xs text-muted">
                        Jane Jefferson,{' '}
                        <time dateTime="2019-05-29">29 May 2019</time>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
      {/* BRANDS */}
    </>
  );
};

export default Home;
