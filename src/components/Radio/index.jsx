import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes, { string } from "prop-types";
import { cn } from "@/utils";
import useEffectDidMount from "@/hooks/useEffectDidMount";
import styled from "styled-components";
const Context = createContext();

const LabelStyle = styled.label`
  padding: 13px;
  cursor: pointer;
  &.active {
    border: 1px solid #000 !important;
  }
  input {
    display: none;
  }
`;

const Radio = ({ children, rating }) => {
  const { value, onChange } = useContext(Context);
  return (
    <div
      className="custom-control custom-checkbox flex"
      onClick={() => onChange(rating)}
    >
      <input
        className="custom-control-input"
        type="radio"
        name={rating}
        checked={value === rating}
        readOnly
      />
      <label className="custom-control-label">{children}</label>
    </div>
  );
};

Radio.Gender = ({ children, gender }) => {
  const { value, onChange } = useContext(Context);

  return (
    <LabelStyle
      className={cn("border", {
        active: value === gender,
      })}
      htmlFor={gender}
      onClick={() => {
        if (value !== gender) {
          onChange(gender);
        }
      }}
    >
      <input
        id={gender}
        type="radio"
        name="gender"
        checked={value === gender}
        onChange={() => {
          console.log("gender");
          onChange(gender);
        }}
      />
      {children}
    </LabelStyle>
  );
};

Radio.Payment = ({ children, imgSrc, type }) => {
  const { value, onChange } = useContext(Context);

  return (
    <div className="form-group card card-sm border">
      <div className="card-body">
        {/* Radio */}
        <div className="custom-control custom-radio">
          {/* Input */}
          <input
            className="custom-control-input collapsed"
            id={type}
            name="payment"
            type="radio"
            checked={value === type}
            onChange={() => onChange(type)}
          />
          {/* Label */}
          <label
            className="custom-control-label d-flex justify-content-between font-size-sm text-body text-nowrap"
            htmlFor={type}
          >
            {children}
            <img className="ml-2" src={imgSrc} alt="..." />
          </label>
        </div>
      </div>
    </div>
  );
};

Radio.Group = ({ children, defaultValue, toggle, onSetFilter }) => {
  const [value, setValue] = useState(defaultValue); //=== dùng để checked ====
  useEffectDidMount(() => setValue(defaultValue), [defaultValue]); //=== khi defaultValue bên ngoài thay đổi ====

  const onChange = (_value) => {
    if (toggle && _value === value) {
      setValue();
      onSetFilter?.();

      return;
    }
    if (_value !== value) {
      setValue(_value);
      onSetFilter?.(_value); //khi click input cần làm cái gì đó ở bên ngoài
    }
  };

  return (
    <Context.Provider value={{ value, onChange }}>{children}</Context.Provider>
  );
};
Radio.propTypes = {
  children: PropTypes.node.isRequired,
  rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Radio.Group.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.bool,
  onSetFilter: PropTypes.func,
};
export default Radio;
