const { cart } = require("../database/models");
const { product } = require("../database/models");
const getPagingData = require("../utils/pagination");
const { statusCodes, messages } = require("../configs");
const { checkPreferences } = require("joi");
const logger = require("../middleware/logger");
const { errorObjGenerator } = require("../middleware").errorHandler;

class CartService {}

CartService.createItem = async (input) => {
  try {
    const { id, userId, quantity } = input;
    let getProduct = await product.findById({ _id: id });
    let getCart = await cart.findOne({ userId });

    if (getCart) {
      let itemIndex = getCart.products.findIndex((p) => p.id === id);
      if (itemIndex > -1) {
        return {
          code: statusCodes.HTTP_OK,
          message: "Item already exists in the cart",
        };
      } else {
        getCart.products.push({
          product_id: getProduct._id,
          item_id: getProduct.item_id,
          item_name: getProduct.item_name,
          quantity: quantity,
          item_price: getProduct.item_price,
          total_price: quantity
            ? quantity * getProduct.item_price
            : 1 * getProduct.item_price,
        });

        getCart.cart_total = getCart.products.reduce((total, product) => {
          return total + product.total_price;
        }, 0);

        let result = await getCart.save();
        return {
          code: statusCodes.HTTP_OK,
          message: "Item added to Cart",
          data: result ? result : {},
        };
      }
    } else {
      let cartTotal = 0;
      cartTotal += quantity
        ? quantity * getProduct.item_price
        : getProduct.item_price;
      let result = cart.create({
        userId: userId,
        products: [
          {
            product_id: getProduct._id,
            item_id: getProduct.item_id,
            item_name: getProduct.item_name,
            quantity: quantity,
            item_price: getProduct.item_price,
            total_price: quantity
              ? quantity * getProduct.item_price
              : 1 * getProduct.item_price,
          },
        ],
        cart_total: cartTotal,
      });
      return {
        code: statusCodes.HTTP_OK,
        message: "Item added to Cart",
        data: result ? result : {},
      };
    }
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

CartService.editItem = async (input) => {
  try {
    const { userId, product_id, quantity } = input;
    let getCart = await cart.findOne({ userId });
    let getProductFromCart = getCart.products.find(
      (data) => data.product_id === product_id
    );

    if (getProductFromCart) {
      await cart.updateOne(
        { userId: userId, "products.product_id": product_id },
        {
          $set: {
            "products.$.quantity": quantity,
            "products.$.total_price": quantity * getProductFromCart.item_price,
          },
        }
      );
      const updatedCart = await cart.findOne({ userId });
      const cart_total = updatedCart.products.reduce(
        (total, product) => total + product.total_price,
        0
      );
      let result = await cart.updateOne(
        { userId: userId },
        {
          $set: {
            cart_total: cart_total,
          },
        }
      );

      return {
        code: statusCodes.HTTP_OK,
        message: "Cart updated successfully",
        data: result ? result : {},
      };
    } else {
      return {
        code: statusCodes.HTTP_OK,
        message: "Item not exist in the cart",
      };
    }
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

CartService.removeItem = async (input) => {
  try {
    const { userId, product_id } = input;
    let getCart = await cart.findOne({ userId });
    let getProductFromCart = getCart.products.find(
      (data) => data.product_id === product_id
    );

    if (getProductFromCart) {
      let result = await cart.updateOne(
        { userId: userId },
        {
          $pull: { products: { product_id: product_id } },
          $inc: { cart_total: -getProductFromCart.total_price },
        }
      );

      return {
        code: statusCodes.HTTP_OK,
        message: "Item deleted successfully",
        data: result ? result : {},
      };
    } else {
      return {
        code: statusCodes.HTTP_OK,
        message: "Item not exist in the cart",
      };
    }
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

CartService.getAllItems = async (input) => {
  try {
    let { page, size, id } = input;

    let condition = {};
    if (id) condition._id = id;
    let { limit, offset } = getPagingData(page, size);

    let result = await cart.find(condition).limit(limit).skip(offset);
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

CartService.getCartItems = async (input) => {
  try {
    let { page, size, userId } = input;

    let { limit, offset } = getPagingData(page, size);

    // iii. Queries to retrieve information based on array field/embedded object field.
    let cartData = await cart
      .findOne({ userId, products: { $exists: true, $not: { $size: 0 } } })
      .limit(limit)
      .skip(offset);

    if (!cartData) {
      return {
        code: statusCodes.HTTP_OK,
        message: "Cart not found",
        data: cartData ? cartData : {},
      };
    }

    let result = {
      products: [...cartData.products],
      cart_total: cartData.cart_total,
    };

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

module.exports = CartService;
