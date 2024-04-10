const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductSchema = new Schema(
  {
    item_id: {
      type: Number,
      required: true,
      unique: true,
    },
    item_name: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    item_price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = ProductSchema;
