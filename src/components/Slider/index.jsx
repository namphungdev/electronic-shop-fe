import React, { Children } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay"

const Slider = ({ children, className, ...props }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      className={className}
     
      {...props}
    >
      {Children.map(children, (child, id) => (
        <SwiperSlide key={id}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
