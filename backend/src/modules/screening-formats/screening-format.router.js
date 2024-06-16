const express = require("express");

const ScreeningFormatService = require("./screening-format.service");

const screeningFormatRouter = express.Router();

screeningFormatRouter.get("/", async (req, res) => {
  const screeningFormats = await ScreeningFormatService.getAll();

  return res.send({ screeningFormats });
});

module.exports = screeningFormatRouter;
