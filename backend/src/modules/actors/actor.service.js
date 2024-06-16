const db = require("../../../db/db");

class ActorService {
  static async getAll() {
    return await db.from("actor");
  }
}

module.exports = ActorService;
