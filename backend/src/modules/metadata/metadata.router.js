const express = require("express");

const MetadataService = require("./metadata.service");

const metadataRouter = express.Router();

metadataRouter.get("/oltp", async (req, res) => {
  const metadatas = await MetadataService.getOltpMetadata();

  return res.send({ metadatas });
});

metadataRouter.get("/olap/facts", async (req, res) => {
  const metadatas = await MetadataService.getOlapMetadataFacts();
  return res.send({ metadatas });
});

metadataRouter.get("/olap/dimensions", async (req, res) => {
  const metadatas = await MetadataService.getOlapMetadataDimensions();
  return res.send({ metadatas });
});

metadataRouter.get("/data-load-history", async (req, res) => {
  const metadatas = await MetadataService.getDataLoadHistory();
  return res.send({ metadatas });
});

metadataRouter.post("/primary-fill", async (req, res) => {
  await MetadataService.primaryFill();
  return res.status(201).send();
});

metadataRouter.post("/incremental-fill", async (req, res) => {
  await MetadataService.incrementalFill();
  return res.status(201).send();
});

module.exports = metadataRouter;
