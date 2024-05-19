import React, { useRef, useState } from "react";

const ZoomImage = ({ children, timesIncrease = 2 }) => {
  const imageRef = useRef();
  const imageWrapperRef = useRef();
  const [styleImage, setStyleImage] = useState({});
  const imageWrapperWidth = imageWrapperRef.current?.offsetWidth;
  const imageWrapperHeight = imageWrapperRef.current?.offsetHeight;
  const imageWidth = imageRef.current?.offsetWidth;
  const imageHeight = imageRef.current?.offsetHeight;

  const handleZoomImage = (e) => {
    if (imageRef.current && imageWrapperRef.current) {
      const ratioX = (imageWidth - imageWrapperWidth) / imageWrapperWidth;
      const ratioY = (imageHeight - imageWrapperHeight) / imageWrapperHeight;
      const pX = e.nativeEvent?.offsetX;
      const pY = e.nativeEvent?.offsetY;
      let x = pX * ratioX;
      let y = pY * ratioY;
      
      setStyleImage({
        left: -x || 0,
        top: -y || 0,
        width: imageWrapperWidth * timesIncrease,
        height: imageWrapperHeight * timesIncrease,
      });
    }
  };
  const handleMouseLeave = () => {
    setStyleImage({});
  };
  return (
    <>
      {children({
        handleMouseLeave,
        handleZoomImage,
        imageRef,
        imageWrapperRef,
        styleImage,
      })}
    </>
  );
};

export default ZoomImage;
