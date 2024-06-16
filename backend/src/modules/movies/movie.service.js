const db = require("../../../db/db");

const MovieGenreService = require("../movie-genres/movie-genre.service");
const MovieCountryService = require("../movie-countries/movie-country.service");
const MovieDirectorService = require("../movie-directors/movie-director.service");
const MovieScenaristService = require("../movie-scenarists/movie-scenarist.service");
const MovieStudioService = require("../movie-studios/movie-studio.service");
const MovieActorService = require("../movie-actors/movie-actor.service");

class MovieService {
  static async getAll(filters, search, page, pageSize) {
    return await db
      .from("movie")
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .leftJoin(
        "age_rating",
        "age_rating.age_rating_id",
        "=",
        "movie.age_rating_id"
      )
      .leftJoin("movie_genre", "movie_genre.movie_id", "=", "movie.movie_id")
      .leftJoin("genre", "genre.genre_id", "=", "movie_genre.genre_id")
      .leftJoin(
        "movie_country_production",
        "movie_country_production.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "country",
        "country.country_id",
        "=",
        "movie_country_production.country_id"
      )
      .leftJoin(
        "movie_main_role",
        "movie_main_role.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin("actor", "actor.actor_id", "=", "movie_main_role.actor_id")
      .leftJoin(
        "movie_director",
        "movie_director.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "director",
        "director.director_id",
        "=",
        "movie_director.director_id"
      )
      .leftJoin(
        "movie_scenarist",
        "movie_scenarist.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "scenarist",
        "scenarist.scenarist_id",
        "=",
        "movie_scenarist.scenarist_id"
      )
      .leftJoin("movie_studio", "movie_studio.movie_id", "=", "movie.movie_id")
      .leftJoin("studio", "studio.studio_id", "=", "movie_studio.studio_id")
      .select(
        "movie.*",
        "age_rating.*",
        db.raw("json_agg(DISTINCT genre) as genres"),
        db.raw("json_agg(DISTINCT studio) as studios")
      )
      .where("movie.name", "like", `%${search}%`)
      .andWhere(filters)
      .groupBy("movie.movie_id", "age_rating.age_rating_id");
  }

  static async getOne(movieId) {
    const movies = await db
      .from("movie")
      .where({ "movie.movie_id": movieId })
      .leftJoin(
        "age_rating",
        "age_rating.age_rating_id",
        "=",
        "movie.age_rating_id"
      )
      .leftJoin("movie_genre", "movie_genre.movie_id", "=", "movie.movie_id")
      .leftJoin("genre", "genre.genre_id", "=", "movie_genre.genre_id")
      .leftJoin(
        "movie_country_production",
        "movie_country_production.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "country",
        "country.country_id",
        "=",
        "movie_country_production.country_id"
      )
      .leftJoin(
        "movie_main_role",
        "movie_main_role.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin("actor", "actor.actor_id", "=", "movie_main_role.actor_id")
      .leftJoin(
        "movie_director",
        "movie_director.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "director",
        "director.director_id",
        "=",
        "movie_director.director_id"
      )
      .leftJoin(
        "movie_scenarist",
        "movie_scenarist.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "scenarist",
        "scenarist.scenarist_id",
        "=",
        "movie_scenarist.scenarist_id"
      )
      .leftJoin("movie_studio", "movie_studio.movie_id", "=", "movie.movie_id")
      .leftJoin("studio", "studio.studio_id", "=", "movie_studio.studio_id")
      .leftJoin(
        "movie_license_contract",
        "movie_license_contract.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "distributor",
        "distributor.distributor_id",
        "=",
        "movie_license_contract.distributor_id"
      )
      .select(
        "movie.*",
        "age_rating.*",
        db.raw(
          "row_to_json(movie_license_contract)::jsonb || json_build_object('distributor', row_to_json(distributor))::jsonb AS movie_license_contract"
        ),
        db.raw("json_agg(DISTINCT genre) as genres"),
        db.raw("json_agg(DISTINCT country) as countries"),
        db.raw("json_agg(DISTINCT actor) as actors"),
        db.raw("json_agg(DISTINCT director) as directors"),
        db.raw("json_agg(DISTINCT scenarist) as scenarists"),
        db.raw("json_agg(DISTINCT studio) as studios")
      )
      .groupBy(
        "movie.movie_id",
        "age_rating.age_rating_id",
        "movie_license_contract.movie_license_contract_id",
        "distributor.distributor_id"
      );
    return movies[0];
  }

  static async getTotalCount(filters, search) {
    const movies = await db
      .from("movie")
      .leftJoin(
        "age_rating",
        "age_rating.age_rating_id",
        "=",
        "movie.age_rating_id"
      )
      .leftJoin("movie_genre", "movie_genre.movie_id", "=", "movie.movie_id")
      .leftJoin("genre", "genre.genre_id", "=", "movie_genre.genre_id")
      .leftJoin(
        "movie_country_production",
        "movie_country_production.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "country",
        "country.country_id",
        "=",
        "movie_country_production.country_id"
      )
      .leftJoin(
        "movie_main_role",
        "movie_main_role.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin("actor", "actor.actor_id", "=", "movie_main_role.actor_id")
      .leftJoin(
        "movie_director",
        "movie_director.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "director",
        "director.director_id",
        "=",
        "movie_director.director_id"
      )
      .leftJoin(
        "movie_scenarist",
        "movie_scenarist.movie_id",
        "=",
        "movie.movie_id"
      )
      .leftJoin(
        "scenarist",
        "scenarist.scenarist_id",
        "=",
        "movie_scenarist.scenarist_id"
      )
      .leftJoin("movie_studio", "movie_studio.movie_id", "=", "movie.movie_id")
      .leftJoin("studio", "studio.studio_id", "=", "movie_studio.studio_id")
      .select("movie.movie_id")
      .where("movie.name", "like", `%${search}%`)
      .andWhere(filters)
      .groupBy("movie.movie_id");
    return movies.length;
  }

  static async getCinemaMovies(cinemaId, startDate) {
    return await db
      .from("cinema")
      .where("cinema.cinema_id", "=", cinemaId)
      .leftJoin("hall", "hall.cinema_id", "=", "cinema.cinema_id")
      .leftJoin("session", "session.hall_id", "=", "hall.hall_id")
      .leftJoin("movie", "movie.movie_id", "=", "session.movie_id")
      .where("session.session_datetime", ">=", startDate)
      .select("movie.*")
      .groupBy("movie.movie_id");
  }

  static async getCinemaMovieSessions(cinemaId, movieId, startDate) {
    const tommorowDate = new Date(startDate);
    tommorowDate.setDate(new Date(startDate).getDate() + 1);
    return await db
      .from("cinema")
      .where("cinema.cinema_id", "=", cinemaId)
      .leftJoin("hall", "hall.cinema_id", "=", "cinema.cinema_id")
      .leftJoin("session", "session.hall_id", "=", "hall.hall_id")
      .where("session.movie_id", "=", movieId)
      .andWhere("session.session_datetime", ">=", startDate)
      .andWhere(
        "session.session_datetime",
        "<",
        tommorowDate.toISOString().slice(0, 10)
      )
      .leftJoin(
        "screening_format",
        "screening_format.screening_format_id",
        "=",
        "session.screening_format_id"
      )
      .select(
        "session.*",
        db.raw("row_to_json(screening_format.*) as screening_format")
      );
  }

  static async deleteMovie(movieId) {
    await db("movie").where("movie.movie_id", "=", movieId).del();
  }

  static async createMovie(movie) {
    const [{ movie_id: newMovieId }] = await db("movie")
      .insert({
        name: movie.name,
        age_rating_id: movie.ageRatingId,
        release_date: movie.releaseDate,
        original_name: movie.name,
        description: movie.description,
        duration_time: movie.duration,
        imdb_rating: movie.imdbRating,
      })
      .returning("movie_id");
    await Promise.all(
      movie.genreIds.map((genreId) =>
        MovieGenreService.createMovieGenre(newMovieId, genreId)
      )
    );
    await Promise.all(
      movie.countryIds.map((countryId) =>
        MovieCountryService.createMovieCountry(newMovieId, countryId)
      )
    );
    await Promise.all(
      movie.directorIds.map((directorId) =>
        MovieDirectorService.createMovieDirector(newMovieId, directorId)
      )
    );
    await Promise.all(
      movie.scenaristIds.map((scenaristId) =>
        MovieScenaristService.createMovieScenarist(newMovieId, scenaristId)
      )
    );
    await Promise.all(
      movie.studioIds.map((studioId) =>
        MovieStudioService.createMovieStudio(newMovieId, studioId)
      )
    );
    await Promise.all(
      movie.actorIds.map((actorId) =>
        MovieActorService.createMovieActor(newMovieId, actorId)
      )
    );
    return await MovieService.getOne(newMovieId);
  }
}

module.exports = MovieService;
