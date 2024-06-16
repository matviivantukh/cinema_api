const db = require("../../../db/db");

class StudioService {
  static async getAll() {
    return await db.from("studio");
  }
}

module.exports = StudioService;
