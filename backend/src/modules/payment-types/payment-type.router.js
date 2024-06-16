const express = require("express");

const PaymentTypeService = require("./payment-type.service");

const paymentTypeRouter = express.Router();

paymentTypeRouter.get("/", async (req, res) => {
  const paymentTypes = await PaymentTypeService.getAll();

  return res.send({ paymentTypes });
});

module.exports = paymentTypeRouter;
