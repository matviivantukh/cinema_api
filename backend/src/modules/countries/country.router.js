const express = require("express");

const CountryService = require("./country.service");

const countryRouter = express.Router();

countryRouter.get("/", async (req, res) => {
  const countries = await CountryService.getAll();

  return res.send({ countries });
});

module.exports = countryRouter;
