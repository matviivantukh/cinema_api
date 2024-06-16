const db = require("../../../db/db");

class CountryService {
  static async getAll() {
    return await db.from("country");
  }
}

module.exports = CountryService;
