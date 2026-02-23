import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-2">
      <button 
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="bg-gray-800 px-4 py-2 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
      <button 
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="bg-gray-800 px-4 py-2 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
