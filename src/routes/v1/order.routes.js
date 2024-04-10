const express = require("express");
const orderRoutes = express.Router();
const { orderController } = require("../../controllers/index");
const {
  verifyToken,
  verifySession,
  authenticate,
} = require("../../middleware");

let validator = require("express-joi-validation").createValidator({
  passError: true,
});
const {
  placeOrderSchema,
  cancelOrderSchema,
  reOrderSchema,
  updateOrderSchema,
} = require("../../validators").order;
orderRoutes.get("/orderList", orderController.getAllOrderItems);
orderRoutes.get("/orderItems", orderController.getOrderItems);
orderRoutes.post(
  "/placeOrder",
  validator.body(placeOrderSchema),
  orderController.placeOrder
);
orderRoutes.post(
  "/cancelOrder",
  validator.body(cancelOrderSchema),
  orderController.cancelOrder
);
orderRoutes.post(
  "/reOrder",
  validator.body(reOrderSchema),
  orderController.reOrder
);
orderRoutes.put(
  "/updateOrder",
  validator.body(updateOrderSchema),
  orderController.updateOrder
);

module.exports = orderRoutes;
