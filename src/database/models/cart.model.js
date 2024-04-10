const mongoose = require("mongoose");
const cartSchema = require("../schemas").cart;

// cart model
module.exports = mongoose.model("cart", cartSchema);
