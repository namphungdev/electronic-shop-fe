import React from "react";
import { cloneElement } from "react";
import { useContext } from "react";
import { useRef } from "react";
import { Children } from "react";
import { useState } from "react";
import { createContext } from "react";
import styled from "styled-components";

const Context = createContext();

const TitleStyle = styled.a`
  &::after {
    transition: all 0.3s ease-in-out;
    transform: rotateX(${({ active }) => (active ? "180deg" : "0deg")});
  }
`;

const ContentStyle = styled.div`
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const Accordion = ({ title, children, index }) => {
  // const [active, setActive] = useState(false);
  const { activeIndex, onActive } = useContext(Context);

  const contentRef = useRef();
  const heightContent = contentRef.current?.scrollHeight;

  const active = activeIndex === index;
  
  const _onClick = (e) => {
    e.preventDefault();
    onActive(index);
  };
  return (
    <li className="list-group-item">
      <TitleStyle
        className="dropdown-toggle d-block font-size-lg font-weight-bold text-reset mb-5"
        href="#"
        onClick={_onClick}
        active={active}
      >
        {title}
      </TitleStyle>
      <ContentStyle style={{ height: active ? heightContent : 0 }}>
        <div ref={contentRef}>
          <p className="mb-0 font-size-lg text-gray-500">{children}</p>
        </div>
      </ContentStyle>
    </li>
  );
};

Accordion.Group = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const onActive = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };
  return (
    <Context.Provider value={{ activeIndex, onActive }}>
      {Children.map(children, (child, index) => cloneElement(child, { index }))}
    </Context.Provider>
  );
};

export default Accordion;
