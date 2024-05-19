import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const container = document.createElement("div");
const PortalTitle = ({ children, selector }) => {
  const [_, forceRender] = useState();
  useEffect(() => {
    forceRender(Math.random());
  }, []);
  return createPortal(children, document.querySelector(selector) || container);
};

export default PortalTitle;
