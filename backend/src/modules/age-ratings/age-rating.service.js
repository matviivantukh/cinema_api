const db = require("../../../db/db");

class AgeRatingService {
  static async getAll() {
    return await db.from("age_rating");
  }
}

module.exports = AgeRatingService;
