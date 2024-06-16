const express = require("express");

const ViewerService = require("./viewer.service");

const viewerRouter = express.Router();

viewerRouter.get("/", async (req, res) => {
  const search = req.query.search ?? "";

  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;

  const count = await ViewerService.getTotalCount(search);
  const pagesCount = Math.ceil(count / pageSize);

  const viewers = await ViewerService.getAll(search, page, pageSize);

  return res.send({ viewers, pagesCount });
});

module.exports = viewerRouter;
