const db = require("../../../db/db");

class MovieGenreService {
  static async createMovieGenre(movieId, genreId) {
    return await db("movie_genre").insert({
      movie_id: movieId,
      genre_id: genreId,
    });
  }
}

module.exports = MovieGenreService;
