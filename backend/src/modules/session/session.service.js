const db = require("../../../db/db");

class SessionService {
  static async getAllSessionSeats(sessionId) {
    return await db
      .from("session")
      .where("session.session_id", "=", sessionId)
      .leftJoin(
        "session_seat",
        "session_seat.session_id",
        "=",
        "session.session_id"
      )
      .leftJoin(
        "ticket",
        "ticket.session_seat_id",
        "=",
        "session_seat.session_seat_id"
      )
      .leftJoin("seat", "seat.seat_id", "=", "session_seat.seat_id")
      .select(
        "session_seat.*",
        db.raw("row_to_json(ticket.*) as ticket"),
        db.raw("row_to_json(seat.*) as seat")
      );
  }
}

module.exports = SessionService;
