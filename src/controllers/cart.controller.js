"use strict";
const { cartService } = require("../services");
const { response, logger } = require("../middleware");

class CartController {}

CartController.createCartItem = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await cartService.createItem(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

CartController.editCartItem = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method editUserData @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await cartService.editItem(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method editUserData @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

CartController.removeCartItem = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method editUserData @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await cartService.removeItem(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method editUserData @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

CartController.getAllCartItems = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.query }
  );
  try {
    let input = { ...req.query };

    let result = await cartService.getAllItems(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

CartController.getCartItems = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.query }
  );
  try {
    let input = { ...req.query };

    let result = await cartService.getCartItems(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

module.exports = CartController;
