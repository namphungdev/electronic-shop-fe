import { cn } from "@/utils";
import React from "react";
import { Input as AntdInput } from "antd";

const FieldInput = ({
  type = "text",
  label,
  error,
  renderInput,
  onChange,
  classNameGroup,
  ...props
}) => {
  const _onChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <div className={cn("form-group relative", classNameGroup)}>
      {label && <label htmlFor={props.id}>{label}</label>}

      {renderInput ? (
        renderInput({ _onChange, error, type, ...props })
      ) : (
        <AntdInput
          type={type}
          onChange={_onChange}
          style={{ border: error ? "1px solid red" : "" }}
          className={cn(props.className, { "placeholder-red-500": !!error })}
          {...props}
        />
      )}

      <div className="absolute left-0 top-full italic">
        {error && <span className="text-red-500">{error}</span>}
      </div>
    </div>
  );
};

export default FieldInput;
