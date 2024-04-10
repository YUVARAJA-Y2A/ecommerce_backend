const express = require("express");
const cartRoutes = express.Router();
const { cartController } = require("../../controllers/index");
const {
  verifyToken,
  verifySession,
  authenticate,
} = require("../../middleware");

let validator = require("express-joi-validation").createValidator({
  passError: true,
});
const { createCartSchema, deleteCartSchema, updateCartSchema } =
  require("../../validators").cart;

cartRoutes.get("/cartList", cartController.getAllCartItems);
cartRoutes.get("/cartItems", cartController.getCartItems);
cartRoutes.post(
  "/addToCart",
  validator.body(createCartSchema),
  cartController.createCartItem
);
cartRoutes.put(
  "/updateCart",
  validator.body(updateCartSchema),
  cartController.editCartItem
);
cartRoutes.delete(
  "/removeCart",
  validator.body(deleteCartSchema),
  cartController.removeCartItem
);

module.exports = cartRoutes;
