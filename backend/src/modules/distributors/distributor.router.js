const express = require("express");

const DistributorService = require("./distributor.service");

const distributorRouter = express.Router();

distributorRouter.get("/", async (req, res) => {
  const distributors = await DistributorService.getAll();

  return res.send({ distributors });
});

module.exports = distributorRouter;
