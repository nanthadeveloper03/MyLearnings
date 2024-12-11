// CustomPagination.js

import React from 'react';

const CustomPagination = ({ rowsPerPage, rowCount, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);
  const pagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`page-number ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="custom-pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-arrow"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      {endPage < totalPages && (
        <>
          <span className="dots">...</span>
          <button onClick={() => onPageChange(totalPages)} className="page-number">
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-arrow"
      >
        &gt;
      </button>
    </div>
  );
};

export default CustomPagination;  // Ensure it's exported
