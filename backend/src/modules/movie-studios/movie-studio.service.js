const db = require("../../../db/db");

class MovieStudioService {
  static async createMovieStudio(movieId, studioId) {
    return await db("movie_studio").insert({
      movie_id: movieId,
      studio_id: studioId,
    });
  }
}

module.exports = MovieStudioService;
