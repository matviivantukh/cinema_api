const express = require("express");

const MovieService = require("./movie.service");

const movieRouter = express.Router();

movieRouter.get("/:movieId", async (req, res) => {
  const movie = await MovieService.getOne(+req.params.movieId);

  return res.send(movie);
});

movieRouter.get("/", async (req, res) => {
  const filters = JSON.parse(req.query.filters ?? "{}");
  const search = req.query.search ?? "";

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const count = await MovieService.getTotalCount(filters, search);
  const pagesCount = Math.ceil(count / pageSize);

  const movies = await MovieService.getAll(filters, search, page, pageSize);

  return res.send({ movies, pagesCount });
});

movieRouter.get("/cinemas/:cinemaId", async (req, res) => {
  const cinemaId = +req.params.cinemaId;

  const startDate = new Date(req.query.startDate);

  const movies = await MovieService.getCinemaMovies(cinemaId, startDate);

  return res.send({ movies });
});

movieRouter.get("/:movieId/cinemas/:cinemaId/sessions", async (req, res) => {
  const cinemaId = +req.params.cinemaId;
  const movieId = +req.params.movieId;

  const startDate = new Date(req.query.startDate);

  const sessions = await MovieService.getCinemaMovieSessions(
    cinemaId,
    movieId,
    startDate
  );

  return res.send({ sessions });
});

movieRouter.delete("/:movieId", async (req, res) => {
  const movieId = +req.params.movieId;

  await MovieService.deleteMovie(movieId);

  return res.sendStatus(204);
});

movieRouter.post("/", async (req, res) => {
  const movie = req.body;

  const newMovie = await MovieService.createMovie(movie);

  return res.status(201).send(newMovie);
});

module.exports = movieRouter;
