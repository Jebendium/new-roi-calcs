import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageNumbers: (number | string)[];
  handlePageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageNumbers,
  handlePageChange
}) => {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center space-x-1" aria-label="Pagination">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-label="Previous page"
          aria-disabled={currentPage === 1}
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Page Numbers */}
        {pageNumbers.map((pageNum, index) => (
          <React.Fragment key={index}>
            {pageNum === '...' ? (
              <span className="px-3 py-2 text-sm text-slate-500" aria-hidden="true">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(pageNum as number)}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                aria-label={`Page ${pageNum}`}
                aria-current={currentPage === pageNum ? 'page' : undefined}
              >
                {pageNum}
              </button>
            )}
          </React.Fragment>
        ))}
        
        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          aria-label="Next page"
          aria-disabled={currentPage === totalPages}
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  );
};
