import { Button } from 'antd';
import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Pagination = (props: PaginationProps) => {
  const { totalPages, currentPage, setCurrentPage } = props;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(

      <Button
        key={i}
        onClick={() => setCurrentPage(i)}
        className={`w-8 h-8 mx-1 rounded-full transition-colors ${
          currentPage === i 
            ? 'bg-primary text-white hover:bg-primary/90' 
            : 'bg-white hover:bg-gray-100'
        }`}
      >
        {i}
      </Button>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 ">
      <Button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-full disabled:opacity-50"
      >
        Prev
      </Button>
      {pages}
      <Button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-full disabled:opacity-50"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
