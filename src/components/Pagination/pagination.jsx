import "./index.css";

const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const pageNumbers = [...Array(pageCount).keys()].map((num) => num + 1);

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button
          className="pagination__button"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
