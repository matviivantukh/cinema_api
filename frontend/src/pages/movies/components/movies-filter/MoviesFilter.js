import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getAllGenres } from "../../../../store/actions/genre-actions";
import { getAllStudios } from "../../../../store/actions/studio-actions";

import Select from "../../../../UI/Select";

import classes from "./MoviesFilter.module.css";

const MoviesFilter = () => {
  const { genres } = useSelector((store) => store.genres);
  const { studios } = useSelector((store) => store.studios);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [genreId, setGenreId] = useState(null);
  const [studioId, setStudioId] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllStudios());
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    const filters = {};
    if (genreId) {
      filters["genre.genre_id"] = genreId;
    }
    if (studioId) {
      filters["studio.studio_id"] = studioId;
    }
    const hasFilters =
      filters["genre.genre_id"] != undefined ||
      filters["studio.studio_id"] != undefined;
    navigate(
      `/?${hasFilters ? "filters=" + JSON.stringify(filters) + "&" : ""}${
        debouncedSearch != "" ? "search=" + debouncedSearch : ""
      }`
    );
  }, [genreId, studioId, debouncedSearch]);

  return (
    <div className={classes["filters"]}>
      <input
        placeholder="Enter name of the movie"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className={classes["search-bar"]}
      />
      <Select
        label={"Genre"}
        options={genres.map((genre) => ({
          label: genre.genre_name,
          value: genre.genre_id,
        }))}
        onChange={(value) => setGenreId(value)}
      />
      <Select
        label={"Studio"}
        options={studios.map((studio) => ({
          label: studio.studio_name,
          value: studio.studio_id,
        }))}
        onChange={(value) => setStudioId(value)}
      />
    </div>
  );
};

export default MoviesFilter;
