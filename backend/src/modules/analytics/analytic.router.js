const express = require("express");

const AnalyticService = require("./analytic.service");

const analyticRouter = express.Router();

analyticRouter.get("/", async (req, res) => {
  const filters = JSON.parse(req.query.filters ?? "{}");

  const analyticResults = await AnalyticService.getAllByFilters(filters);

  return res.send({ analyticResults });
});

module.exports = analyticRouter;
