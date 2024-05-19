import React from "react";
import { Popconfirm as PopconfirmM } from "antd";
import Button from "../Button";

const PopConfirm = ({ description, onConfirm, loading, ...props }) => {
  return (
    <PopconfirmM
      {...props}
      okButtonProps={{
        hidden: true,
      }}
      cancelButtonProps={{
        hidden: true,
      }}
      description={
        <>
          {description}
          <div className="flex justify-end">
            {props?.cancelText && (
              <Button
                className="mt-5 btn-xs mr-2"
                outline
                onClick={() => props.onCancel()}
              >
                {props.cancelText || "Cancel"}
              </Button>
            )}
            {props?.okText && (
              <Button
                className="mt-5 btn-xs rounded"
                onClick={onConfirm}
                loading={loading}
              >
                {props.okText || "ok"}
              </Button>
            )}
          </div>
        </>
      }
    />
  );
};

export default PopConfirm;
