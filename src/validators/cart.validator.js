const utils = require("../utils");
const Joi = require("joi").extend(require("@joi/date"));

const createCartSchema = Joi.object({
  userId: Joi.string().required(),
  id: Joi.string().required(),
  quantity: Joi.number(),
});

const deleteCartSchema = Joi.object({
  userId: Joi.string().required(),
  product_id: Joi.string().required(),
});

const updateCartSchema = Joi.object({
  userId: Joi.string().required(),
  product_id: Joi.string().required(),
  quantity: Joi.number().required(),
});

module.exports = {
  createCartSchema,
  deleteCartSchema,
  updateCartSchema,
};
