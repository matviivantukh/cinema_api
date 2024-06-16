const db = require("../../../db/db");

class PaymentTypeService {
  static async getAll() {
    return await db.from("payment_type");
  }
}

module.exports = PaymentTypeService;
