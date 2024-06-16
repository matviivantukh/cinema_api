const db = require("../../../db/db");

class LanguageService {
  static async getAll() {
    return await db.from("language");
  }
}

module.exports = LanguageService;
