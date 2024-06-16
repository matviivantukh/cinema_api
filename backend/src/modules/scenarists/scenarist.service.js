const db = require("../../../db/db");

class ScenaristService {
  static async getAll() {
    return await db.from("scenarist");
  }
}

module.exports = ScenaristService;
