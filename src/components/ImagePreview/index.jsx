import React, { forwardRef } from "react";
import Portal from "../Portal";

const ImagePreview = forwardRef(({ images = [] }, ref) => {
  return (
    <Portal>
      <div className="w-[100px] h-[100px] hidden" ref={ref}>
        {images?.map((e) => (
          <a
            key={e?.base_url}
            data-fancybox="gallery"
            data-src={e?.base_url}
            className="image-item"
          >
            <img src={e?.base_url} className="w-full h-full object-cover" />
          </a>
        ))}
      </div>
    </Portal>
  );
});

export default ImagePreview;
