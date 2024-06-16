const db = require("../../../db/db");

class MovieDirectorService {
  static async createMovieDirector(movieId, directorId) {
    return await db("movie_director").insert({
      movie_id: movieId,
      director_id: directorId,
    });
  }
}

module.exports = MovieDirectorService;
