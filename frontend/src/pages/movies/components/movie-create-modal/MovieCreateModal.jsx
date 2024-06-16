import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getAllGenres } from "../../../../store/actions/genre-actions";
import { getAllStudios } from "../../../../store/actions/studio-actions";
import { getAllActors } from "../../../../store/actions/actor-actions";
import { getAllDirectors } from "../../../../store/actions/director-actions";
import { getAllCountries } from "../../../../store/actions/country-actions";
import { getAllScenarists } from "../../../../store/actions/scenarist-actions";
import { getAllAgeRatings } from "../../../../store/actions/age-rating-actions";

import Select from "../../../../UI/Select";

import classes from "./MovieCreateModal.module.css";
import { createMovie } from "../../../../store/actions/movie-actions";

const MovieCreateModal = ({ onClose }) => {
  const { genres } = useSelector((store) => store.genres);
  const { studios } = useSelector((store) => store.studios);
  const { actors } = useSelector((store) => store.actors);
  const { directors } = useSelector((store) => store.directors);
  const { countries } = useSelector((store) => store.countries);
  const { scenarists } = useSelector((store) => store.scenarists);
  const { ageRatings } = useSelector((store) => store.ageRatings);
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);
  const [selectedStudioIds, setSelectedStudioIds] = useState([]);
  const [selectedActorIds, setSelectedActorIds] = useState([]);
  const [selectedDirectorIds, setSelectedDirectorIds] = useState([]);
  const [selectedCountryIds, setSelectedCountryIds] = useState([]);
  const [selectedScenaristIds, setSelectedScenaristIds] = useState([]);
  const [selectedAgeRating, setSelectedAgeRating] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [imdbRating, setImdbRating] = useState(0);
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(
      createMovie({
        name,
        ageRatingId: selectedAgeRating,
        releaseDate: releaseDate.toISOString().slice(0, 10),
        description,
        duration,
        imdbRating,
        genreIds: selectedGenreIds,
        studioIds: selectedStudioIds,
        actorIds: selectedActorIds,
        directorIds: selectedDirectorIds,
        countryIds: selectedCountryIds,
        scenaristIds: selectedScenaristIds,
      })
    );
    navigate(`/movies/${action.payload.movie_id}`);
    onClose();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(getAllStudios());
    dispatch(getAllActors());
    dispatch(getAllDirectors());
    dispatch(getAllCountries());
    dispatch(getAllScenarists());
    dispatch(getAllAgeRatings());
  }, []);

  return (
    <div className={classes["movie-create-modal"]}>
      <form
        className={classes["movie-create-form"]}
        onSubmit={handleFormSubmit}
      >
        <h2>Create Movie</h2>
        <input
          placeholder="Enter name"
          className={classes["input"]}
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <textarea
          placeholder="Enter description"
          className={classes["input"]}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <input
          placeholder="Enter dureation in minutes"
          className={classes["input"]}
          type="number"
          onChange={(e) => setDuration(e.target.value)}
          value={duration}
        />
        <label>
          <span>Release date</span>
          <input
            className={classes["input"]}
            type="date"
            onChange={(e) => setReleaseDate(new Date(e.target.value))}
            value={releaseDate.toISOString().slice(0, 10)}
          />
        </label>
        <input
          placeholder="Enter IMDB rating"
          className={classes["input"]}
          type="number"
          onChange={(e) => setImdbRating(e.target.value)}
          value={imdbRating}
        />
        <Select
          className={classes["select"]}
          label={"Select age rating"}
          options={ageRatings.map((ageRating) => ({
            label: ageRating.age_rating_name,
            value: ageRating.age_rating_id,
          }))}
          onChange={(ageRatingId) => {
            setSelectedAgeRating(ageRatingId);
          }}
        />
        <div className={classes["movie-create-modal-selects"]}>
          <Select
            className={classes["select"]}
            label={"Select actors"}
            options={actors.map((actor) => ({
              label: actor.full_name,
              value: actor.actor_id,
            }))}
            onChange={(actorId) => {
              setSelectedActorIds((prev) => {
                if (prev.includes(actorId)) {
                  return prev.filter((id) => id !== actorId);
                }
                return [...prev, actorId];
              });
            }}
            selectedOptions={selectedActorIds}
            multiple
            onRemove={(actorId) =>
              setSelectedActorIds((prev) => prev.filter((id) => id !== actorId))
            }
          />
          <Select
            className={classes["select"]}
            label={"Select countries"}
            options={countries.map((country) => ({
              label: country.country_name,
              value: country.country_id,
            }))}
            onChange={(countryId) => {
              setSelectedCountryIds((prev) => {
                if (prev.includes(countryId)) {
                  return prev.filter((id) => id !== countryId);
                }
                return [...prev, countryId];
              });
            }}
            selectedOptions={selectedCountryIds}
            multiple
            onRemove={(countryId) =>
              setSelectedCountryIds((prev) =>
                prev.filter((id) => id !== countryId)
              )
            }
          />
          <Select
            className={classes["select"]}
            label={"Select directors"}
            options={directors.map((director) => ({
              label: director.full_name,
              value: director.director_id,
            }))}
            onChange={(directorId) => {
              setSelectedDirectorIds((prev) => {
                if (prev.includes(directorId)) {
                  return prev.filter((id) => id !== directorId);
                }
                return [...prev, directorId];
              });
            }}
            selectedOptions={selectedDirectorIds}
            multiple
            onRemove={(directorId) =>
              setSelectedDirectorIds((prev) =>
                prev.filter((id) => id !== directorId)
              )
            }
          />
          <Select
            className={classes["select"]}
            label={"Select genres"}
            options={genres.map((genre) => ({
              label: genre.genre_name,
              value: genre.genre_id,
            }))}
            onChange={(genreId) => {
              setSelectedGenreIds((prev) => {
                if (prev.includes(genreId)) {
                  return prev.filter((id) => id !== genreId);
                }
                return [...prev, genreId];
              });
            }}
            selectedOptions={selectedGenreIds}
            multiple
            onRemove={(genreId) =>
              setSelectedGenreIds((prev) => prev.filter((id) => id !== genreId))
            }
          />
          <Select
            className={classes["select"]}
            label={"Select scenarists"}
            options={scenarists.map((scenarist) => ({
              label: scenarist.full_name,
              value: scenarist.scenarist_id,
            }))}
            onChange={(scenaristId) => {
              setSelectedScenaristIds((prev) => {
                if (prev.includes(scenaristId)) {
                  return prev.filter((id) => id !== scenaristId);
                }
                return [...prev, scenaristId];
              });
            }}
            selectedOptions={selectedScenaristIds}
            multiple
            onRemove={(scenaristId) =>
              setSelectedScenaristIds((prev) =>
                prev.filter((id) => id !== scenaristId)
              )
            }
          />
          <Select
            className={classes["select"]}
            label={"Select studios"}
            options={studios.map((studio) => ({
              label: studio.studio_name,
              value: studio.studio_id,
            }))}
            onChange={(studioId) => {
              setSelectedStudioIds((prev) => {
                if (prev.includes(studioId)) {
                  return prev.filter((id) => id !== studioId);
                }
                return [...prev, studioId];
              });
            }}
            selectedOptions={selectedStudioIds}
            multiple
            onRemove={(studioId) =>
              setSelectedStudioIds((prev) =>
                prev.filter((id) => id !== studioId)
              )
            }
          />
        </div>
        <div className={classes["actions"]}>
          <button className={classes["button"]} onClick={onClose}>
            Close
          </button>
          <button type="submit" className={classes["button"]}>
            Create Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieCreateModal;
