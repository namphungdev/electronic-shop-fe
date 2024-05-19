import React, { Children, cloneElement, Fragment } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ children }) => {
  return (
    <ol className="breadcrumb mb-md-0 font-size-xs text-gray-400">
      {children}
    </ol>
  );
};

Breadcrumb.Item = ({ children, to }) => {
  return (
    <li className="breadcrumb-item">
      {to ? (
        <Link className="text-gray-400" to={to}>
          {children}
        </Link>
      ) : (
        <>{children}</>
      )}
    </li>
  );
};

export default Breadcrumb;
