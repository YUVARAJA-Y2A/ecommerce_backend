const express = require("express");
const userRoutes = express.Router();
const { userController } = require("../../controllers/index");
const {
  verifyToken,
  verifySession,
  authenticate,
} = require("../../middleware");

let validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { signUpSchema, signInSchema, getUserSchema } =
  require("../../validators").user;

userRoutes.post(
  "/createUser",
  validator.body(signUpSchema),
  userController.createUser
);
userRoutes.post("/signIn", validator.body(signInSchema), userController.signIn);
userRoutes.get("/getAllUsers", userController.getAllUsers);
userRoutes.post(
  "/getUser",
  validator.body(getUserSchema),
  userController.getUser
);

module.exports = userRoutes;
