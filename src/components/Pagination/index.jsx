import { cn } from "@/utils";
import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const Pagination = ({ totalPage, page = "page", style = {}, onPageChange }) => {
  const [searchParam] = useSearchParams();
  const currentPageFromUrl = Number(searchParam.get(page) || 1);
  const { pathname } = useLocation();
  const _searchParam = new URLSearchParams(searchParam);
  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  useEffect(() => {
    setCurrentPage(currentPageFromUrl);
  }, [currentPageFromUrl]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage);
    _searchParam.set(page, newPage);
    window.history.pushState({}, "", `${pathname}?${_searchParam.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginate = () => {
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;
    const list = [];

    if (startPage < 1) {
      startPage = 1;
      endPage = startPage + 4;
    }

    if (endPage >= totalPage) {
      endPage = totalPage;
      startPage = endPage - 6 > 0 ? endPage - 6 : 1;
    }
    for (let i = startPage; i <= endPage; i++) {
      list.push(
        <li
          className={cn("page-item", { active: currentPage === i })}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          <span className="page-link cursor-pointer">{i}</span>
        </li>
      );
    }

    return list;
  };

  return (
<nav
      className="d-flex justify-content-center justify-content-md-end mb-5 select-none mx-auto w-max"
      style={style}
    >
      <ul className="pagination pagination-sm text-gray-400">
        {currentPage > 1 && totalPage > 5 && (
          <li className="page-item" onClick={() => handlePageChange(1)}>
            <span className="page-link page-link-arrow">
              <i className="fa fa-caret-left" />
              <i className="fa fa-caret-left" />
            </span>
          </li>
        )}
        {currentPage > 1 && (
          <li className="page-item" onClick={() => handlePageChange(currentPage - 1)}>
            <span className="page-link page-link-arrow">
              <i className="fa fa-caret-left" />
            </span>
          </li>
        )}
        {renderPaginate()}
        {currentPage < totalPage && (
          <li className="page-item" onClick={() => handlePageChange(currentPage + 1)}>
            <span className="page-link page-link-arrow">
              <i className="fa fa-caret-right" />
            </span>
          </li>
        )}
        {currentPage < totalPage && totalPage > 5 && (
          <li className="page-item" onClick={() => handlePageChange(totalPage)}>
            <span className="page-link page-link-arrow">
              <i className="fa fa-caret-right" />
              <i className="fa fa-caret-right" />
            </span>
          </li>
        )}
      </ul>
    </nav>

  );
};

export default Pagination;
