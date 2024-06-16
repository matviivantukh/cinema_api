const express = require("express");

const ScenaristService = require("./scenarist.service");

const scenaristRouter = express.Router();

scenaristRouter.get("/", async (req, res) => {
  const scenarists = await ScenaristService.getAll();

  return res.send({ scenarists });
});

module.exports = scenaristRouter;
