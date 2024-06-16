const express = require("express");

const DirectorService = require("./director.service");

const directorRouter = express.Router();

directorRouter.get("/", async (req, res) => {
  const directors = await DirectorService.getAll();

  return res.send({ directors });
});

module.exports = directorRouter;
