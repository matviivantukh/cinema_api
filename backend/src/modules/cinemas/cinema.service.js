const db = require("../../../db/db");

class CinemaService {
  static async getAll() {
    return await db
      .from("cinema")
      .leftJoin("city", "city.city_id", "=", "cinema.city_id")
      .leftJoin("country", "country.country_id", "=", "city.country_id")
      .select(
        "cinema.*",
        db.raw(
          "row_to_json(city)::jsonb || json_build_object('country', row_to_json(country))::jsonb AS city"
        )
      );
  }
}

module.exports = CinemaService;
