const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let CartSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        item_id: Number,
        item_name: String,
        quantity: Number,
        item_price: Number,
        total_price: Number,
      },
    ],
    modifiedOn: { type: Date, default: Date.now },
    cart_total: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = CartSchema;
