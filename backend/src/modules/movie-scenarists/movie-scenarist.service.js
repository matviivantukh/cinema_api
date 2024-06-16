const db = require("../../../db/db");

class MovieScenaristService {
  static async createMovieScenarist(movieId, scenaristId) {
    return await db("movie_scenarist").insert({
      movie_id: movieId,
      scenarist_id: scenaristId,
    });
  }
}

module.exports = MovieScenaristService;
