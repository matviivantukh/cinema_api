const express = require("express");

const ActorService = require("./actor.service");

const actorRouter = express.Router();

actorRouter.get("/", async (req, res) => {
  const actors = await ActorService.getAll();

  return res.send({ actors });
});

module.exports = actorRouter;
