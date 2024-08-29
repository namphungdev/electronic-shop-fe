import React from 'react';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .search-modal-overlay {
      position: fixed; 
      top: 0; 
      left: 0; 
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      z-index: 1;
  }

  .search-modal-container {
      display: flex;
      justify-content: flex-end;
  }

  .search-modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
      z-index: 2;
      width: 100%; 
      max-width: 400px;
  }

  .search-input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
  }
`

const SearchModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <>
      <GlobalStyle />
      <div className="search-modal-overlay" onClick={onClose}>
        <div className="container search-modal-container">
          <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
            <input type="text" className="search-input" placeholder="Search..." />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
