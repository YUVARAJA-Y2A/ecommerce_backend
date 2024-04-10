"use strict";
const { userService } = require("../services");
const { response, logger } = require("../middleware");

class UserController {}

UserController.createUser = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await userService.createUser(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

UserController.signIn = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method createUser @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await userService.signIn(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method createUser @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

UserController.editUserData = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method editUserData @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await userService.editUserData(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method editUserData @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

UserController.getAllUsers = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.body }
  );
  try {
    let input = { ...req.query };
    let result = await userService.getAllUsers(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

UserController.getUser = async (req, res, next) => {
  logger.info(
    "@Controller user.controller @Method getAllUsers @Message req.body",
    { data: req.body }
  );
  try {
    let input = req.body;
    let result = await userService.getUser(input);
    return response.success(req, res, result.code, result.data, result.message);
  } catch (err) {
    console.error(
      "@Controller user.controller @Method getAllUsers @Message ERROR",
      { data: err }
    );
    next(err);
  }
};

module.exports = UserController;
