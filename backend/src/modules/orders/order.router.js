const express = require("express");

const OrderService = require("./order.service");

const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  const order = req.body;

  await OrderService.createOrder(order);

  return res.status(201).send(order);
});

module.exports = orderRouter;
