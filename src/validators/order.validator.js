const utils = require("../utils");
const Joi = require("joi").extend(require("@joi/date"));

const placeOrderSchema = Joi.object({
  userId: Joi.string().required(),
});

const cancelOrderSchema = Joi.object({
  userId: Joi.string().required(),
  product_id: Joi.string().required(),
});

const reOrderSchema = Joi.object({
  userId: Joi.string().required(),
  product_id: Joi.string().required(),
  quantity: Joi.number().required(),
});

const updateOrderSchema = Joi.object({
  userId: Joi.string().required(),
  id: Joi.string().required(),
  order_status: Joi.number().required(),
});

module.exports = {
  placeOrderSchema,
  cancelOrderSchema,
  reOrderSchema,
  updateOrderSchema,
};
