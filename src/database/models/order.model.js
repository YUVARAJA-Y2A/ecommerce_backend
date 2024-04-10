const mongoose = require("mongoose");
const orderSchema = require("../schemas").order;

// cart model
module.exports = mongoose.model("order", orderSchema);
