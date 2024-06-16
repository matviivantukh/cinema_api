const db = require("../../../db/db");

class GenreService {
  static async getAll() {
    return await db.from("genre");
  }
}

module.exports = GenreService;
