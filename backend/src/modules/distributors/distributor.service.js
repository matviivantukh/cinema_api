const db = require("../../../db/db");

class DistributorService {
  static async getAll() {
    return await db.from("distributor");
  }
}

module.exports = DistributorService;
