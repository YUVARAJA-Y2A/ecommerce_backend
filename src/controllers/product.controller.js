"use strict";
const { productService } = require("../services");
const { response, logger } = require("../middleware");

class ProductController {}

ProductController.createProduct = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.query }
  );
  try {
    let input = req.query;

    let result = await productService.createProduct(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

ProductController.createProductItem = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;

    let result = await productService.createProductItem(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

ProductController.editProduct = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method editUserData @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await productService.editProduct(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method editUserData @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

ProductController.removeProduct = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method editUserData @Message req.body",
    { data: req.query }
  );
  try {
    let input = req.query;

    let result = await productService.removeProduct(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method editUserData @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

ProductController.getAllProducts = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.body }
  );
  try {
    let input = { ...req.query };

    let result = await productService.getAllProducts(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

ProductController.getSearchAndSortProducts = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.body }
  );
  try {
    let input = { ...req.body };

    let result = await productService.getSearchAndSortProducts(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

module.exports = ProductController;
