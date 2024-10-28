import React, { Children } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import './index.css'

const SliderProduct = ({ children, className, ...props }) => {
  return (
    // <Swiper
    //   modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    //   className={className}
    //   style={{ background: "#fff" }}
    //   navigation={{
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   }}
    //   {...props}
    // >
    //   {Children.map(children, (child, id) => (
    //     <SwiperSlide key={id}>{child}</SwiperSlide>
    //   ))}
    //   <div className="swiper-button-next custom-next-button"></div>
    //   <div className="swiper-button-prev custom-prev-button"></div>
    // </Swiper>
    <div style={{ position: "relative" }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        className={className}
        style={{ background: "#fff" }}
        navigation={{
          nextEl: ".custom-next-button",
          prevEl: ".custom-prev-button",
        }}
        {...props}
      >
        {Children.map(children, (child, id) => (
          <SwiperSlide key={id}>{child}</SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-next custom-next-button"></div>
      <div className="swiper-button-prev custom-prev-button"></div>
    </div>
  );
};

export default SliderProduct;
