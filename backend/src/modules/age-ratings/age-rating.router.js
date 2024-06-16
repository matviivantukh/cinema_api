const express = require("express");

const AgeRatingService = require("./age-rating.service");

const ageRatingRouter = express.Router();

ageRatingRouter.get("/", async (req, res) => {
  const ageRatings = await AgeRatingService.getAll();

  return res.send({ ageRatings });
});

module.exports = ageRatingRouter;
