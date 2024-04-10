const { dbConfig } = require("./../../configs");

dbConfig();

module.exports = {
  user: require("./user.model"),
  cart: require("./cart.model"),
  order: require("./order.model"),
  product: require("./product.model"),
};
