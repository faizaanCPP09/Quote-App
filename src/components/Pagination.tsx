import React from 'react';

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-blue-500 text-white px-4 py-2 rounded-l"
      >
        Previous
      </button>
      <span className="bg-gray-200 dark:bg-gray-700 dark:text-white px-4 py-2">{page}</span>
      <button
        onClick={() => setPage(page + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded-r"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;