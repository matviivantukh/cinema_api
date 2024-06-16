const db = require("../../../db/db");

class MovieCountryService {
  static async createMovieCountry(movieId, countryId) {
    return await db("movie_country_production").insert({
      movie_id: movieId,
      country_id: countryId,
    });
  }
}

module.exports = MovieCountryService;
