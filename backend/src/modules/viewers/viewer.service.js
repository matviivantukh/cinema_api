const db = require("../../../db/db");

class ViewerService {
  static async getAll(search, page, pageSize) {
    return await db
      .from("viewer")
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .where("name", "like", `%${search}%`);
  }

  static async getTotalCount(search) {
    const viewers = await db
      .from("viewer")
      .where("name", "like", `%${search}%`);
    return viewers.length;
  }
}

module.exports = ViewerService;
