import React, { useEffect, useRef, useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { PATH, PRODUCT_API_HHB } from '@/config';
import axios from 'axios';
import { Spin } from 'antd';

const GlobalStyle = createGlobalStyle`
  .search-modal-overlay {
    position: fixed;
    top: 91px;
    right: -15px;
    width: 100%;
    z-index: 9;
  }

  .search-modal-container {
    display: flex;
    justify-content: end;
  }

  .search-modal-content {
    position: relative;
    background: white;
    width: 30%;
    border-radius: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .search-modal-content .search-input {
    width: 100%;
    height: 45px;
    border-radius: 30px;
    border: none;
    padding-left: 20px;
    outline: none;
  }

  .search-modal-content input.full-radius {
    border-radius: 30px; 
  }

  .search-modal-content input:focus {
    border: none;
    outline: none;
  }

  .search-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
    font-size: 18px;
    cursor: pointer;
  }

  .search-icon.with-results {
    top: 8%; 
  }

  .search-results {
    background-color: white;
    border-radius: 0 0 30px 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    overflow-y: auto;
    z-index: 10;
  }

  .search-results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 10px;
    margin-bottom: 10px;
    background: #f1f1f1;
    border-bottom: 1px solid #ebebeb;
    border-top: 1px solid #ebebeb;
  }

  .search-results-header span {
    font-size: 16px;
    font-weight: 600;
    color: #333;
  }

  .view-more {
    font-size: 14px;
    color: #ba9344;
    cursor: pointer;
    text-decoration: underline;
  }

  .search-result-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
  }

  .search-result-item img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 10px;
  }

  .search-result-item:last-child {
    border-bottom: none;
  }

  .search-result-title {
    font-size: 14px;
    color: #333;
  }

  .search-result-price {
    font-size: 12px;
    color: #666;
  }

  .loading-spinner {
    text-align: center;
    margin-bottom: 20px;
  }

  .no-results {
    padding: 20px;
    text-align: center;
    color: #999;
    font-size: 16px;
  }
`;

const SearchModal = ({ isVisible, onClose }) => {
  const modalRef = useRef(null);
  const location = useLocation()
  const [searchValue, setSearchValue] = useState('');
  const [dataSearch, setDataSearch] = useState('')
  const [loading, setLoading] = useState(false);

  const param = {
    keyword: searchValue,
    pageIndex: 1,
    pageSize: 10,
    code: null,
    type: 0,
    order: 'id',
    sort: 'desc'
  }

  async function fetchSearchList() {
    if (!searchValue) return;
    setLoading(true)
    try {
      const response = await axios.post(`${PRODUCT_API_HHB}/web-get-product-list`, param);
      await setDataSearch(response?.data?.data?.data)
      await setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('There has been a problem with your axios request:', error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      fetchSearchList();
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <GlobalStyle />
      <div className="search-modal-overlay">
        <div className="container search-modal-container">
          <div
            ref={modalRef}
            className="search-modal-content"
          >
            <input
              type="text"
              className={`search-input ${dataSearch && dataSearch?.length > 0 ? 'full-radius' : ''}`}
              placeholder="Tìm kiếm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon className={`search-icon ${dataSearch?.length > 0 ? 'with-results' : ''}`} icon={faMagnifyingGlass} />

            {loading && (
              <div className="loading-spinner">
                <Spin size="default" />
              </div>
            )}

            {!loading && dataSearch && dataSearch?.length > 0 ? (
              <div className="search-results">
                <div className="search-results-header">
                  <span>Sản phẩm</span>
                  <Link to={`${PATH.search}?keyword=${searchValue}`} className="view-more">Xem thêm</Link>
                </div>

                {dataSearch.slice(0, 3).map((result) => (
                  <div key={result.code} className="search-result-item">
                    <img src={result.images[0].base_url} alt={result.name} />
                    <div>
                      <div className="search-result-title">{result.name}</div>
                      <div className="search-result-price">{result.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : !loading && searchValue && searchValue.trim() !== '' && dataSearch.length === 0 && (
              <div className="no-results">
                Không có kết quả tìm kiếm cho "<strong>{searchValue}</strong>"
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;