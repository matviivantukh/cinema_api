import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";

import { getAllMovies } from "../../store/actions/movie-actions";

import usePagination from "../../components/pagination/hooks/use-pagination";

import MovieList from "./components/movie-list/MovieList";
import Pagination from "../../components/pagination/Pagination";
import MoviesFilter from "./components/movies-filter/MoviesFilter";
import MovieCreateModal from "./components/movie-create-modal/MovieCreateModal";

import classes from "./Movies.module.css";
import Backdrop from "../../UI/Backdrop";

const Movies = () => {
  const [filters, setFilters] = useState("{}");
  const [search, setSearch] = useState("");
  const { movies, pagesCount } = useSelector((store) => store.movies);
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  const { page, goToPage } = usePagination();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFilters(queryParams.get("filters") ?? "{}");
    setSearch(queryParams.get("search") ?? "");
    goToPage(1);
  }, [location]);

  useEffect(() => {
    dispatch(getAllMovies(page, filters, search));
  }, [page, filters, search]);

  return (
    <div className={classes["movies-page"]}>
      {isCreateModalOpened &&
        createPortal(
          <>
            <Backdrop onClose={() => setIsCreateModalOpened(false)} />
            <MovieCreateModal onClose={() => setIsCreateModalOpened(false)} />
          </>,
          document.getElementById("modal")
        )}
      <div>
        <div className={classes["movies-header"]}>
          <MoviesFilter />
          <button onClick={() => setIsCreateModalOpened(true)}>
            Add Movie
          </button>
        </div>
        <MovieList movies={movies} />
      </div>
      <Pagination
        currentPage={page}
        pagesCount={pagesCount}
        onPageChange={goToPage}
      />
    </div>
  );
};

export default Movies;
