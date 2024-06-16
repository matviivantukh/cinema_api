const db = require("../../../db/db");
const { v4: uuidv4 } = require("uuid");

class OrderService {
  static async createOrder(order) {
    const [newOrder] = await db("order")
      .insert({
        viewer_id: order.viewerId,
        total_sum: order.totalSum,
        payment_datetime: new Date().toISOString(),
        payment_type_id: order.paymentTypeId,
        order_number: uuidv4(),
      })
      .returning("*");
    await Promise.all(
      order.tickets.map((ticket) =>
        db("ticket").insert({
          session_seat_id: ticket.sessionSeatId,
          order_id: newOrder.order_id,
        })
      )
    );
    const [movieLicenseContract] = await db("movie_license_contract_accrual")
      .rightJoin(
        "movie_license_contract",
        "movie_license_contract_accrual.movie_license_contract_id",
        "movie_license_contract.movie_license_contract_id"
      )
      .join("movie", "movie_license_contract.movie_id", "movie.movie_id")
      .join("session", "session.movie_id", "movie.movie_id")
      .join("session_seat", "session.session_id", "session_seat.session_id")
      .where("session_seat.session_seat_id", order.tickets[0].sessionSeatId)
      .select(
        "movie_license_contract.*",
        db.raw(
          "row_to_json(movie_license_contract_accrual) as movie_license_contract_accrual"
        )
      );
    if (!movieLicenseContract.movie_license_contract_accrual) {
      await db("movie_license_contract_accrual").insert({
        movie_license_contract_id:
          movieLicenseContract.movie_license_contract_id,
        total_sum: order.totalSum,
        ticket_count: order.tickets.length,
        last_ticket_datetime: newOrder.payment_datetime,
      });
      return;
    }
    await db("movie_license_contract_accrual")
      .update({
        total_sum:
          movieLicenseContract.movie_license_contract_accrual.total_sum +
          order.totalSum,
        ticket_count:
          movieLicenseContract.movie_license_contract_accrual.ticket_count +
          order.tickets.length,
        last_ticket_datetime: newOrder.payment_datetime,
      })
      .where({
        movie_license_contract_accrual_id:
          movieLicenseContract.movie_license_contract_accrual
            .movie_license_contract_accrual_id,
      });
  }
}

module.exports = OrderService;
