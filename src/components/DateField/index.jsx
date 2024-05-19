import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";

const DateField = ({ className, error, onChange, value, name, ...props }) => {
  const dateFormat = "DD/MM/YYYY";
  const { user } = useAuth();
  return (
    <DatePicker
      {...props}
      name={name}
      value={value ? dayjs(value, dateFormat) : undefined}
      format={dateFormat}
      onChange={(_, dateString) => {
        onChange(dateString || user?.birthday);
      }}
      className={cn(`${className} hover:border-black transition-all`, {
        "border-red-500": !!error,
      })}
    />
  );
};

export default DateField;
