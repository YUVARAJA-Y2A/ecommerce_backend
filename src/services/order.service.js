const { order, cart, product } = require("../database/models");
const getPagingData = require("../utils/pagination");
const { statusCodes, messages } = require("../configs");
const { checkPreferences } = require("joi");
const logger = require("../middleware/logger");
const { errorObjGenerator } = require("../middleware").errorHandler;

class OrderService {}

OrderService.placeOrder = async (input) => {
  try {
    const { userId } = input;

    let getCart = await cart.findOne({ userId });
    let getOrder = await order.findOne({ userId });

    if (getOrder) {
      getCart.products.forEach((prod) =>
        getOrder.orders.push({
          product_id: prod.product_id,
          item_name: prod.item_name,
          quantity: prod.quantity,
          item_price: prod.item_price,
          total_price: prod.total_price,
        })
      );

      let result = await getOrder.save();

      const productIds = getCart.products.map((order) => order.product_id);
      const products = await product.find({ _id: { $in: productIds } });

      if (products.length !== getCart.products.length) {
        return res.status(404).json({ error: "Some products not found" });
      }

      const updateOperations = [];

      for (let i = 0; i < products.length; i++) {
        const order = getCart.products[i];
        const product = products[i];

        if (product.quantity < order.quantity) {
          return res
            .status(400)
            .json({ error: "Insufficient quantity available" });
        }

        product.quantity -= order.quantity;

        updateOperations.push({
          updateOne: {
            filter: { _id: product._id },
            update: { quantity: product.quantity },
          },
        });
      }

      await product.bulkWrite(updateOperations);

      getCart.products = [];
      getCart.cart_total = 0;

      await getCart.save();

      return {
        code: statusCodes.HTTP_OK,
        message: "Order placed successfully",
        data: result ? result : {},
      };
    } else {
      const createOrders = getCart.products.map((product) => ({
        product_id: product.product_id,
        item_name: product.item_name,
        quantity: product.quantity,
        item_price: product.item_price,
        total_price: product.total_price,
      }));

      let result = order.create({
        userId: userId,
        orders: createOrders,
      });

      const productIds = getCart.products.map((order) => order.product_id);
      const products = await product.find({ _id: { $in: productIds } });

      if (products.length !== getCart.products.length) {
        return res.status(404).json({ error: "Some products not found" });
      }

      const updateOperations = [];

      for (let i = 0; i < products.length; i++) {
        const order = getCart.products[i];
        const product = products[i];

        if (product.quantity < order.quantity) {
          return res
            .status(400)
            .json({ error: "Insufficient quantity available" });
        }

        product.quantity -= order.quantity;

        updateOperations.push({
          updateOne: {
            filter: { _id: product._id },
            update: { quantity: product.quantity },
          },
        });
      }

      await product.bulkWrite(updateOperations);

      getCart.products = [];
      getCart.cart_total = 0;
      await getCart.save();

      return {
        code: statusCodes.HTTP_OK,
        message: "Order placed successfully",
        data: result ? result : {},
      };
    }
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

OrderService.cancelOrder = async (input) => {
  try {
    const { product_id, userId } = input;
    let getOrder = await order.findOne({ userId });

    const getOrderStatus = await order.findOne({
      userId: userId,
      "orders.product_id": product_id,
      "orders.order_status.value": { $ne: 5 },
    });

    if (getOrderStatus) {
      return {
        code: statusCodes.HTTP_OK,
        message: "Order already cancelled",
      };
    }

    const Order = await order.findOneAndUpdate(
      { userId: userId, "orders.product_id": product_id },
      {
        $set: {
          "orders.$.order_status": { label: "Order Cancelled", value: 5 },
        },
      },
      { new: true }
    );

    if (!Order) {
      return {
        code: statusCodes.HTTP_OK,
        message: "Order not found",
      };
    }

    let cancelOrder = getOrder.orders.find((order) => order.product_id);

    const Product = await product.findOneAndUpdate(
      { _id: product_id },
      { $inc: { quantity: cancelOrder.quantity } },
      { new: true }
    );

    if (!Product) {
      return {
        code: statusCodes.HTTP_OK,
        message: "Product not found",
      };
    }

    return {
      code: statusCodes.HTTP_OK,
      message: "Order cancelled successfully",
      data: cancelOrder ? cancelOrder : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

OrderService.reOrder = async (input) => {
  try {
    const { id, userId, quantity } = input;
    let getProduct = await product.findById({ _id: id });
    let getCart = await cart.findOne({ userId });

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

OrderService.updateOrder = async (input) => {
  try {
    const { id, userId, order_status } = input;

    if (order_status > 4) {
      return {
        code: statusCodes.HTTP_OK,
        message: "Invalid Order Status",
      };
    }

    const orderHandler = (order_status) => {
      let orderStatus = [
        { label: "Order Placed", value: 1 },
        { label: "Dispatched", value: 2 },
        { label: "In Transit", value: 3 },
        { label: "Delivered", value: 4 },
      ];

      return orderStatus[order_status - 1];
    };

    const result = await order.findOneAndUpdate(
      { userId: userId, "orders._id": id },
      {
        $set: {
          "orders.$.order_status": orderHandler(order_status),
        },
      },
      { new: true }
    );

    if (!result) {
      return {
        code: statusCodes.HTTP_OK,
        message: "Order not found",
      };
    }

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

OrderService.getAllItems = async (input) => {
  try {
    let { page, size, id } = input;

    let condition = {};
    if (id) condition._id = id;
    let { limit, offset } = getPagingData(page, size);

    let result = await order.find(condition).limit(limit).skip(offset);
    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    logger.info({
      message: "@Service user.service @Method getAllItems @Message ERROR",
      data: err,
    });
    throw errorObjGenerator(err);
  }
};

OrderService.getOrderItems = async (input) => {
  try {
    let { page, size, userId } = input;

    let { limit, offset } = getPagingData(page, size);

    let result = await order.findOne({ userId }).limit(limit).skip(offset);

    if (!result) {
      return {
        code: statusCodes.HTTP_OK,
        message: "Order not found",
      };
    }

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    logger.info({
      message: "@Service user.service @Method getAllItems @Message ERROR",
      data: err,
    });
    throw errorObjGenerator(err);
  }
};

module.exports = OrderService;
