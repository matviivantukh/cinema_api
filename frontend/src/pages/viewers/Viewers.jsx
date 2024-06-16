import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { getAllViewers } from "../../store/actions/viewer-actions";

import usePagination from "../../components/pagination/hooks/use-pagination";

import ViewerList from "./components/viewer-list/ViewerList";

import classes from "./Viewers.module.css";
import ViewersFilter from "./components/viewers-filter/ViewersFilter";
import Pagination from "../../components/pagination/Pagination";

const Viewers = () => {
  const { viewers, pagesCount } = useSelector((state) => state.viewers);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const location = useLocation();

  const { page, goToPage } = usePagination();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSearch(queryParams.get("search") ?? "");
    goToPage(1);
  }, [location, goToPage]);

  useEffect(() => {
    dispatch(getAllViewers(page, search));
  }, [dispatch, page, search]);

  return (
    <div className={classes["viewers-page"]}>
      <div>
        <ViewersFilter />
        <ViewerList viewers={viewers} />
      </div>
      <Pagination
        pagesCount={pagesCount}
        currentPage={page}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default Viewers;
