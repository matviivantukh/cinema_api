const db = require("../../../db/db");

class MovieActorService {
  static async createMovieActor(movieId, actorId) {
    return await db("movie_main_role").insert({
      movie_id: movieId,
      actor_id: actorId,
    });
  }
}

module.exports = MovieActorService;
