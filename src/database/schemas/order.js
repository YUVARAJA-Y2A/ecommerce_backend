const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    orders: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        item_name: String,
        quantity: Number,
        item_price: Number,
        total_price: Number,
        order_status: {
          label: { type: String, default: "Order Placed" },
          value: { type: Number, default: 1 },
        },
        ordered_date: { type: Date, default: Date.now },
      },
    ],
    modifiedOn: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = OrderSchema;
