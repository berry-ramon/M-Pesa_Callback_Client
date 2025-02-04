const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
