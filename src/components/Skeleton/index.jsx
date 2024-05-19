import React from "react";
import styled from "styled-components";

const SkeletonStyled = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: #eee;
  background-image: linear-gradient(
    110deg,
    #ececec 8%,
    #f5f5f5 18%,
    #ececec 33%
  );
  background-size: 200% 100%;
  animation: 1s shine linear infinite;
  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;

const Skeleton = ({ className = "", ...props }) => {
  return (
    <SkeletonStyled
      className={`skeleton ${className}`}
      style={{ ...props }}
    ></SkeletonStyled>
  );
};

export default Skeleton;
