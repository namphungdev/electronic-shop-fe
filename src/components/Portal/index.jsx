import { createPortal } from "react-dom";

const Portal = ({
  containerClassName = "",
  contentClassName = "",
  contentStyle = {},
  containerStyled = {},
  overlay,
  children,
  onClose,
  open,
}) => {
  const renderElement = (
    <div
      className={`containerPortal ${containerClassName}`}
      style={containerStyled}
    >
      {overlay && (
        <div
          style={{ transition: "all 0.2s ease-in-out" }}
          className={`overlay absolute inset-0 cursor-pointer bg-black bg-opacity-70 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        ></div>
      )}

      {children && (
        <div className={`content ${contentClassName}`} style={contentStyle}>
          {children}
        </div>
      )}
    </div>
  );

  return createPortal(renderElement, document.body);
};
export default Portal;
