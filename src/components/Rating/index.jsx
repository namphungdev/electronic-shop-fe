import React from "react";
import styled from "styled-components";

const RatingStyled = styled.span`
  width: 70px;
  height: 14px;
  background: url(/img/star-gray.svg) repeat-x;
  position: relative;
  display: inline-block;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: ${({ value }) => (+value.toFixed(1) / 5) * 100}%;

    height: 100%;
    background: url(/img/star-yellow.svg) repeat-x;
  }
`;
const Rating = ({ value }) => {
  return (
    <>
      <RatingStyled value={value} />
    </>
  );
};

export default Rating;
