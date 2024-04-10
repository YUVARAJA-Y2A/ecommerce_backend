"use strict";
const { orderService } = require("../services");
const { response, logger } = require("../middleware");

class OrderController {}

OrderController.getAllOrderItems = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.query }
  );
  try {
    let input = { ...req.query };

    let result = await orderService.getAllItems(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

OrderController.getOrderItems = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.query }
  );
  try {
    let input = { ...req.query };

    let result = await orderService.getOrderItems(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

OrderController.placeOrder = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await orderService.placeOrder(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

OrderController.cancelOrder = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await orderService.cancelOrder(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

OrderController.reOrder = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await orderService.reOrder(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

OrderController.updateOrder = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await orderService.updateOrder(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

module.exports = OrderController;
