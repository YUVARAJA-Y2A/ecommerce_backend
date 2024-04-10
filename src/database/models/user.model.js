const mongoose = require("mongoose");
const userSchema = require("../schemas").user;

// user model
module.exports = mongoose.model("users", userSchema);