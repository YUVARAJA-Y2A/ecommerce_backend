const mongoose = require("mongoose");
const productSchema = require("../schemas").product;

// product model
module.exports = mongoose.model("product", productSchema);
