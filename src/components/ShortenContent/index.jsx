import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";

const ShortenContentStyle = styled.div`
  .content {
    overflow: hidden;
  }

  .read-more {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      visibility: ${({ isShorted }) => (isShorted ? "visible" : "hidden")};
      left: 0;
      right: 0;
      bottom: 100%;
      height: 140px;
      background-image: linear-gradient(
        rgba(255, 255, 255, 0),
        rgb(255, 255, 255)
      );
    }
  }
`;

const ShortenContent = ({ children, className, ...props }) => {
  const [isShorted, setIsShorted] = useState(true);
  return (
    <ShortenContentStyle className={className} isShorted={isShorted}>
      <div
        {...props}
        style={{ height: isShorted ? 300 : "auto" }}
        className="content"
      >
        {children}
      </div>
      <div className="read-more flex justify-center">
        <Button
          onClick={() => setIsShorted(!isShorted)}
          className="normal-case mt-2"
          outline
        >
          {isShorted ? "Xem thêm nội dung" : "Thu gọn nội dung"}
        </Button>
      </div>
    </ShortenContentStyle>
  );
};

export default ShortenContent;
