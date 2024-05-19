import { cn } from "@/utils";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
const Button = ({
  outline,
  children,
  className = "",
  style = {},
  loading = false,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={cn("btn btn-sm relative uppercase", className, {
        "cursor-not-allowed": loading,
        "cursor-default": disabled,
        "btn-dark": !outline,
        "btn-outline-dark": outline,
      })}
      type="submit"
      style={style}
      disabled={loading || disabled}
      onClick={onClick}
    >
      <LoadingOutlined
        style={{ fontSize: 30 }}
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-[loadingCircle2_1s_infinite_linear]",
          { visible: loading },
          { invisible: !loading }
        )}
      />
      <span className={cn({ visible: !loading }, { invisible: loading })}>
        {children}
      </span>
    </button>
  );
};

export default Button;
