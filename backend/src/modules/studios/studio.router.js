const express = require("express");

const StudioService = require("./studio.service");

const studioRouter = express.Router();

studioRouter.get("/", async (req, res) => {
  const studios = await StudioService.getAll();

  return res.send({ studios });
});

module.exports = studioRouter;
