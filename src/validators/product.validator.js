const utils = require("../utils");
const Joi = require("joi").extend(require("@joi/date"));

const addProductSchema = Joi.object({
  item_id: Joi.number().min(1).required(),
  item_name: Joi.string().min(2).max(18).required(),
  quantity: Joi.number().min(1).max(10).required(),
  item_price: Joi.number().required(),
});

const updateProductSchema = Joi.object({
  id: Joi.required(),
  item_id: Joi.number().min(1),
  item_name: Joi.string().min(2).max(18),
  quantity: Joi.number().min(1).max(50).required(),
  price: Joi.number().min(1),
});

module.exports = {
  addProductSchema,
  updateProductSchema,
};
