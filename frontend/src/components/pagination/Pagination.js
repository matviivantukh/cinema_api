import classes from "./Pagination.module.css";

const BUTTONS_COUNT = 5;

const Pagination = ({ currentPage, pagesCount, onPageChange }) => {
  const pagesLeft = pagesCount - currentPage + 1;

  const buttons = Array.from(
    {
      length: BUTTONS_COUNT,
    },
    (_, index) => {
      if (BUTTONS_COUNT > pagesLeft) {
        return currentPage - (BUTTONS_COUNT - pagesLeft) + index;
      }
      if (currentPage > Math.floor(BUTTONS_COUNT / 2)) {
        return currentPage - Math.floor(BUTTONS_COUNT / 2) + index;
      }
      return 1 + index;
    }
  )
    .filter((page) => page > 0)
    .map((page) => (
      <li>
        <button
          className={`${classes["pagination-button"]} ${
            page === currentPage ? classes["active"] : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      </li>
    ));

  return <ul className={classes["pagination"]}>{buttons}</ul>;
};

export default Pagination;
