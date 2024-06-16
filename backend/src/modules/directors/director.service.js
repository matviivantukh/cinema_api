const db = require("../../../db/db");

class DirectorService {
  static async getAll() {
    return await db.from("director");
  }
}

module.exports = DirectorService;
