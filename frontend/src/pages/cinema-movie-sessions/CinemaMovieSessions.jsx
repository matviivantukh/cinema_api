import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHours, getMinutes, getMonth, getYear } from "date-fns";
import { createPortal } from "react-dom";

import { getCinemaMovieSessions } from "../../store/actions/cinema-movie-sessions-actions";
import { getOneMovie } from "../../store/actions/movie-actions";

import SessionSeatsModal from "./components/SessionSeatsModal";
import Backdrop from "../../UI/Backdrop";

import classes from "./CinemaMovieSessions.module.css";

import MoviePoster from "../../images/movie_poster_placeholder.jpg";

const CinemaMovieSessions = () => {
  const { cinemaId, movieId } = useParams();
  const { movie } = useSelector((state) => state.movies);
  const { sessions } = useSelector((state) => state.session);
  const [searchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(
    new Date(searchParams.get("startDate")) ?? new Date()
  );
  const [isShortDescription, setIsShortDescription] = useState(true);
  const [sessionId, setSessionId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCinemaMovieSessions(cinemaId, movieId, startDate));
    dispatch(getOneMovie(movieId));
  }, [startDate, cinemaId, movieId]);

  const sessionsTechnologies = useMemo(
    () =>
      sessions.reduce((accum, value) => {
        if (accum.includes(value.screening_format.screening_format)) {
          return accum;
        }
        return [...accum, value.screening_format.screening_format];
      }, []),
    [sessions]
  );

  return (
    <div className={classes["movie-sessions-page"]}>
      {sessionId &&
        createPortal(
          <>
            <Backdrop onClose={() => setSessionId(null)} />
            <SessionSeatsModal
              onClose={() => setSessionId(null)}
              sessionId={sessionId}
            />
          </>,
          document.getElementById("modal")
        )}
      {movie && (
        <div className={classes["movie-item-container"]}>
          <div className={classes["movie-item"]}>
            <div className={classes["movie-content"]}>
              <div className={classes["movie-content-heading"]}>
                <div className={classes["movie-content-heading-left"]}>
                  <h2>{movie.name}</h2>
                  <span>Original title: {movie.original_name}</span>
                  <ul className={classes["movie-date-details"]}>
                    <li>
                      <span>{getYear(new Date(movie.release_date))}</span>
                    </li>
                    <li>
                      <span>{getMonth(new Date(movie.release_date)) + 1}</span>
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
                </div>
              </div>
              <div className={classes["movie-poster-container"]}>
                <img className={classes["movie-poster"]} src={MoviePoster} />
              </div>

              <span className={classes["movie-age-rating"]}>
                +{movie.start_age} {movie.age_rating_name}
              </span>
              {movie.genres.filter((genre) => genre != null).length != 0 && (
                <div className={classes["movie-info-article"]}>
                  <ul className={classes["movie-info-list"]}>
                    {movie.genres.map((genre) => (
                      <li>{genre.genre_name}</li>
                    ))}
                  </ul>
                </div>
              )}
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
      )}
      <div className={classes["sessions-section"]}>
        <form className={classes["form"]}>
          <label>
            <span>Select date</span>
            <input
              className={classes["input"]}
              type="date"
              value={startDate.toISOString().slice(0, 10)}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </label>
        </form>
        <div className={classes["sessions-timetable"]}>
          {sessionsTechnologies.map((technology) => (
            <>
              <span className={classes["technology-name"]}>{technology}</span>
              <ul className={classes["sessions-list"]}>
                {sessions
                  .filter(
                    (session) =>
                      session.screening_format.screening_format === technology
                  )
                  .map((session) => (
                    <li
                      key={session.session_id}
                      className={classes["session-datetime"]}
                      onClick={() => setSessionId(session.session_id)}
                    >
                      {getHours(new Date(session.session_datetime))}:
                      {getMinutes(new Date(session.session_datetime))}
                    </li>
                  ))}
              </ul>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinemaMovieSessions;
