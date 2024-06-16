const express = require("express");

const MovieLicenseContractService = require("./movie-license-contract.service");

const movieRouter = express.Router();

movieRouter.post("/", async (req, res) => {
  const licenseContract = req.body;
  const movieLicenseContract =
    await MovieLicenseContractService.createMovieLicenseContract(
      licenseContract
    );
  res.status(201).json({ movieLicenseContract });
});

module.exports = movieRouter;
