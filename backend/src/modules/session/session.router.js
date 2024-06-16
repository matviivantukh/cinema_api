const express = require("express");

const SessionService = require("./session.service");

const sessionRouter = express.Router();

sessionRouter.get("/:sessionId/seats", async (req, res) => {
  const sessionId = +req.params.sessionId;

  const sessionSeats = await SessionService.getAllSessionSeats(sessionId);

  return res.send({ sessionSeats });
});

module.exports = sessionRouter;
