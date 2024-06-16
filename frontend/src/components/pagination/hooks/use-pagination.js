import { useState, useCallback } from "react";

const usePagination = () => {
  const [page, setPage] = useState(1);

  const goToPage = useCallback(
    (pageNumber) => {
      setPage(pageNumber);
    },
    [setPage]
  );

  return { page, goToPage };
};

export default usePagination;
