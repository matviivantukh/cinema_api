import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getYear, getMonth } from "date-fns";
import { createPortal } from "react-dom";

import { deleteMovie, getOneMovie } from "../../store/actions/movie-actions";

import MovieLicenseContractCreateModal from "./components/movie-license-contract-create-modal/MovieLicenseContractCreateModal";

import classes from "./MovieDetails.module.css";

import MoviePoster from "../../images/movie_poster_placeholder.jpg";
import LeonardoAvatar from "../../images/actor_avatar.webp";
import BurgerMenu from "../../images/icons/burger_menu.svg";
import Backdrop from "../../UI/Backdrop";

const MovieDetails = () => {
  const [isShortDescription, setIsShortDescription] = useState(true);
  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);
  const { movie } = useSelector((store) => store.movies);
  const { movieId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOneMovie(movieId));
  }, [movieId]);

  const handleDeleteMovie = () => {
    dispatch(deleteMovie(movieId));
    navigate(`/`);
  };

  return (
    <div className={classes["details-page"]}>
      {movie && (
        <>
          {isCreateModalOpened &&
            createPortal(
              <>
                <Backdrop onClose={() => setIsCreateModalOpened(false)} />
                <MovieLicenseContractCreateModal
                  onClose={() => setIsCreateModalOpened(false)}
                />
              </>,
              document.getElementById("modal")
            )}
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
                        <span>
                          {getMonth(new Date(movie.release_date)) + 1}
                        </span>
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
                          {movie.movie_license_contract ? null : (
                            <li onClick={() => setIsCreateModalOpened(true)}>
                              Add License
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes["movie-poster-container"]}>
                  <img className={classes["movie-poster"]} src={MoviePoster} />
                  <div className={classes["movie-license-contract"]}>
                    {movie.movie_license_contract ? (
                      <>
                        <div className={classes["contract-section"]}>
                          <h4>License Contract</h4>
                          <span>
                            {
                              movie.movie_license_contract
                                .start_of_screening_date
                            }{" "}
                            -{" "}
                            {movie.movie_license_contract.end_of_screening_date}
                          </span>
                        </div>
                        <div className={classes["contract-section"]}>
                          <h4>Provided by</h4>
                          <span>
                            {
                              movie.movie_license_contract.distributor
                                .distributor_name
                            }
                          </span>
                          <span>
                            {
                              movie.movie_license_contract.distributor
                                .detailed_address
                            }
                          </span>
                        </div>
                      </>
                    ) : (
                      <h4>Add License</h4>
                    )}
                  </div>
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
          <div className={classes["movie-bottom-content"]}>
            {movie.actors.filter((actor) => actor != null).length != 0 && (
              <div>
                <h3 className={classes["movie-article-header"]}>Top Cast</h3>
                <ul className={classes["movie-actors-list"]}>
                  {movie.actors.map((actor) => (
                    <li>
                      <img
                        className={classes["actor-avatar"]}
                        src={LeonardoAvatar}
                      />
                      {actor.full_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {movie.studios.filter((studio) => studio != null).length != 0 && (
              <div>
                <h3 className={classes["movie-article-header"]}>Studios</h3>
                <ul className={classes["movie-studios-list"]}>
                  {movie.studios.map((studio) => (
                    <li>{studio.studio_name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
