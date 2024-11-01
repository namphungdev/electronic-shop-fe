// import React, { useRef, useState } from "react";

// const ZoomImage = ({ children, timesIncrease = 2 }) => {
//   const imageRef = useRef();
//   const imageWrapperRef = useRef();
//   const [styleImage, setStyleImage] = useState({});
//   const imageWrapperWidth = imageWrapperRef.current?.offsetWidth;
//   const imageWrapperHeight = imageWrapperRef.current?.offsetHeight;
//   const imageWidth = imageRef.current?.offsetWidth;
//   const imageHeight = imageRef.current?.offsetHeight;

//   const handleZoomImage = (e) => {
//     if (imageRef.current && imageWrapperRef.current) {
//       const ratioX = (imageWidth - imageWrapperWidth) / imageWrapperWidth;
//       const ratioY = (imageHeight - imageWrapperHeight) / imageWrapperHeight;
//       const pX = e.nativeEvent?.offsetX;
//       const pY = e.nativeEvent?.offsetY;
//       let x = pX * ratioX;
//       let y = pY * ratioY;
      
//       setStyleImage({
//         left: -x || 0,
//         top: -y || 0,
//         width: imageWrapperWidth * timesIncrease,
//         height: imageWrapperHeight * timesIncrease,
//       });
//     }
//   };
//   const handleMouseLeave = () => {
//     setStyleImage({});
//   };
//   return (
//     <>
//       {children({
//         handleMouseLeave,
//         handleZoomImage,
//         imageRef,
//         imageWrapperRef,
//         styleImage,
//       })}
//     </>
//   );
// };

// export default ZoomImage;









// import React, { useRef, useState } from "react";

// const ZoomImage = ({ children, timesIncrease = 2 }) => {
//   const imageRef = useRef();
//   const imageWrapperRef = useRef();
//   const [styleImage, setStyleImage] = useState({ transform: "scale(1)" });

//   const handleZoomImage = () => {
//     setStyleImage({
//       transform: `scale(${timesIncrease})`,
//       transition: "transform 0.3s ease", // Thêm hiệu ứng chuyển đổi mượt mà
//     });
//   };

//   const handleMouseLeave = () => {
//     setStyleImage({
//       transform: "scale(1)", // Trở lại kích thước ban đầu khi rời chuột
//       transition: "transform 0.3s ease",
//     });
//   };

//   return (
//     <>
//       {children({
//         handleMouseLeave,
//         handleZoomImage,
//         imageRef,
//         imageWrapperRef,
//         styleImage,
//       })}
//     </>
//   );
// };

// export default ZoomImage;


// import React, { useRef, useState } from "react";

// const ZoomImage = ({ children, timesIncrease = 2 }) => {
//   const imageRef = useRef();
//   const imageWrapperRef = useRef();
//   const [styleImage, setStyleImage] = useState({
//     transform: "scale(1)",
//     left: "0px",
//     top: "0px",
//   });

//   const handleZoomImage = (e) => {
//     if (imageRef.current && imageWrapperRef.current) {
//       const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect();
//       const mouseX = e.clientX - imageWrapperRect.left; // Vị trí X của chuột so với vùng chứa
//       const mouseY = e.clientY - imageWrapperRect.top; // Vị trí Y của chuột so với vùng chứa

//       // Tính tỷ lệ di chuyển khi ảnh phóng to
//       const moveX =
//         ((mouseX / imageWrapperRect.width) * 100 * (timesIncrease - 1)) / timesIncrease;
//       const moveY =
//         ((mouseY / imageWrapperRect.height) * 100 * (timesIncrease - 1)) / timesIncrease;

//       setStyleImage({
//         transform: `scale(${timesIncrease})`,
//         transition: "transform 0.3s ease", // Hiệu ứng phóng to mượt
//         left: `-${moveX}%`,
//         top: `-${moveY}%`,
//       });
//     }
//   };

//   const handleMouseLeave = () => {
//     setStyleImage({
//       transform: "scale(1)",
//       transition: "transform 0.3s ease",
//       left: "0px",
//       top: "0px",
//     });
//   };

//   return (
//     <>
//       {children({
//         handleMouseLeave,
//         handleZoomImage,
//         imageRef,
//         imageWrapperRef,
//         styleImage,
//       })}
//     </>
//   );
// };

// export default ZoomImage;






// import React, { useRef, useState } from "react";

// const ZoomImage = ({ children, timesIncrease = 2 }) => {
//   const imageRef = useRef();
//   const imageWrapperRef = useRef();
//   const [styleImage, setStyleImage] = useState({
//     transform: "scale(1)",
//     left: "0px",
//     top: "0px",
//   });

//   const handleZoomImage = (e) => {
//     if (imageRef.current && imageWrapperRef.current) {
//       const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect();
//       const imageRect = imageRef.current.getBoundingClientRect();
      
//       const mouseX = e.clientX - imageWrapperRect.left;
//       const mouseY = e.clientY - imageWrapperRect.top;

//       // Tính toán tỷ lệ di chuyển dựa trên kích thước vùng chứa và kích thước ảnh
//       const maxMoveX = (imageRect.width * timesIncrease - imageWrapperRect.width) / 2;
//       const maxMoveY = (imageRect.height * timesIncrease - imageWrapperRect.height) / 2;

//       // Tính vị trí ảnh theo tỷ lệ chuột với giới hạn tối đa
//       const moveX = Math.min(Math.max(((mouseX / imageWrapperRect.width) * maxMoveX * 2) - maxMoveX, -maxMoveX), maxMoveX);
//       const moveY = Math.min(Math.max(((mouseY / imageWrapperRect.height) * maxMoveY * 2) - maxMoveY, -maxMoveY), maxMoveY);

//       setStyleImage({
//         transform: `scale(${timesIncrease})`,
//         transition: "transform 0.1s ease",
//         left: `${moveX}px`,
//         top: `${moveY}px`,
//       });
//     }
//   };

//   const handleMouseLeave = () => {
//     setStyleImage({
//       transform: "scale(1)",
//       transition: "transform 0.3s ease",
//       left: "0px",
//       top: "0px",
//     });
//   };

//   return (
//     <>
//       {children({
//         handleMouseLeave,
//         handleZoomImage,
//         imageRef,
//         imageWrapperRef,
//         styleImage,
//       })}
//     </>
//   );
// };

// export default ZoomImage;





import React, { useRef, useState } from "react";

const ZoomImage = ({ children, timesIncrease = 2 }) => {
  const imageRef = useRef();
  const imageWrapperRef = useRef();
  const [styleImage, setStyleImage] = useState({
    transform: "scale(1)",
    left: "0px",
    top: "0px",
  });

  const handleZoomImage = (e) => {
    if (imageRef.current && imageWrapperRef.current) {
      const imageWrapperRect = imageWrapperRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();
      
      const mouseX = e.clientX - imageWrapperRect.left;
      const mouseY = e.clientY - imageWrapperRect.top;

      // Tính toán kích thước ảnh sau khi phóng to
      const zoomedWidth = imageWrapperRect.width * timesIncrease;
      const zoomedHeight = imageWrapperRect.height * timesIncrease;

      // Xác định vị trí tối đa mà ảnh có thể di chuyển
      const maxMoveX = (zoomedWidth - imageWrapperRect.width) / 2;
      const maxMoveY = (zoomedHeight - imageWrapperRect.height) / 2;

      // Tính toán vị trí di chuyển ảnh theo tỉ lệ chuột, nhưng giới hạn trong phạm vi maxMove
      const moveX = Math.min(Math.max((mouseX / imageWrapperRect.width) * maxMoveX * 2 - maxMoveX, -maxMoveX), maxMoveX);
      const moveY = Math.min(Math.max((mouseY / imageWrapperRect.height) * maxMoveY * 2 - maxMoveY, -maxMoveY), maxMoveY);

      setStyleImage({
        transform: `scale(${timesIncrease})`,
        transition: "transform 0.1s ease",
        left: `${moveX}px`,
        top: `${moveY}px`,
      });
    }
  };

  const handleMouseLeave = () => {
    setStyleImage({
      transform: "scale(1)",
      transition: "transform 0.3s ease",
      left: "0px",
      top: "0px",
    });
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
