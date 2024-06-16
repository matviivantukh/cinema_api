import { useState } from "react";
import { getYear, getMonth } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { deleteMovie } from "../../../../store/actions/movie-actions";

import classes from "./MovieListItem.module.css";

import MoviePoster from "../../../../images/movie_poster_placeholder.jpg";
import BurgerMenu from "../../../../images/icons/burger_menu.svg";

const MovieListItem = ({ movie }) => {
  const [isShortDescription, setIsShortDescription] = useState(true);
  const dispatch = useDispatch();

  const handleDeleteMovie = () => {
    dispatch(deleteMovie(movie.movie_id));
  };

  return (
    <li className={classes["movie-item-container"]}>
      <div className={classes["movie-item"]}>
        <Link to={`movies/${movie.movie_id}`}>
          <img className={classes["movie-poster"]} src={MoviePoster} />
        </Link>
        <div className={classes["movie-content"]}>
          <div className={classes["movie-content-heading"]}>
            <div className={classes["movie-content-heading-left"]}>
              <Link
                to={`movies/${movie.movie_id}`}
                className={classes["movie-title"]}
              >
                <h2>{movie.name}</h2>
              </Link>
              <span>Original title: {movie.original_name}</span>
              <ul className={classes["movie-date-details"]}>
                <li>
                  <span>{getYear(new Date(movie.release_date))}</span>
                </li>
                <li>
                  <span>{getMonth(new Date(movie.release_date))}</span>
                </li>
                <li>
                  <span>
                    {Math.floor(movie.duration_time / 60)}h{" "}
                    {movie.duration_time % 60}m
                  </span>
                </li>
              </ul>
            </div>
            <div className={classes["movie-content-heading-right"]}>
              <div className={classes["movie-rating"]}>
                <span className={classes["movie-rating-heading"]}>
                  IMDb RATING
                </span>
                <div className={classes["movie-rating-content"]}>
                  <span>
                    {Math.round(movie.imdb_rating * 10) / 10}
                    <span className={classes["denominator"]}>/10.0</span>
                  </span>
                </div>
              </div>
              <div className={classes["settings-dropdown"]} tabIndex="1">
                <img height={25} src={BurgerMenu} />
                <div className={classes["settings-dropdown-content"]}>
                  <ul>
                    <li onClick={handleDeleteMovie}>Delete</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <span className={classes["movie-age-rating"]}>
            +{movie.start_age} {movie.age_rating_name}
          </span>
          {movie.genres.filter((genre) => genre != null).length != 0 && (
            <div className={classes["movie-info-article"]}>
              <h3>Genres:</h3>
              <ul className={classes["movie-info-list"]}>
                {movie.genres.map((genre) => (
                  <li>{genre.genre_name}</li>
                ))}
              </ul>
            </div>
          )}
          {movie.studios.filter((movie) => movie != null).length != 0 && (
            <div className={classes["movie-info-article"]}>
              <h3>Studios:</h3>
              <ul className={classes["movie-info-list"]}>
                {movie.studios.map((studio) => (
                  <li>{studio.studio_name}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={classes["movie-info-article"]}>
            <h3>Description:</h3>
            <p
              className={`${classes["movie-description"]} ${
                isShortDescription ? classes["short-description"] : ""
              }`}
              onClick={() => setIsShortDescription((prev) => !prev)}
            >
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default MovieListItem;
