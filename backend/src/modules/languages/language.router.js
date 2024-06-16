const express = require("express");

const LanguageService = require("./language.service");

const languageRouter = express.Router();

languageRouter.get("/", async (req, res) => {
  const languages = await LanguageService.getAll();

  return res.send({ languages });
});

module.exports = languageRouter;
