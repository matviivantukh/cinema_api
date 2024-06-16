const express = require("express");

const CinemaService = require("./cinema.service");

const cinemaRouter = express.Router();

cinemaRouter.get("/", async (req, res) => {
  const cinemas = await CinemaService.getAll();

  return res.send({ cinemas });
});

module.exports = cinemaRouter;
