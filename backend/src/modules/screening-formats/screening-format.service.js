const db = require("../../../db/db");

class ScreeningFormatService {
  static async getAll() {
    return await db.from("screening_format");
  }
}

module.exports = ScreeningFormatService;
