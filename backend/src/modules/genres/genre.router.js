const express = require("express");

const GenreService = require("./genre.service");

const genreRouter = express.Router();

genreRouter.get("/", async (req, res) => {
  const genres = await GenreService.getAll();

  return res.send({ genres });
});

module.exports = genreRouter;
