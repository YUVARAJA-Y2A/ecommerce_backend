const initializeRoutes = (app) => {
  app.use("/api/v1/user", require("./v1/user.routes"));
  app.use("/api/v1/cart", require("./v1/cart.routes"));
  app.use("/api/v1/product", require("./v1/product.routes"));
  app.use("/api/v1/order", require("./v1/order.routes"));
  app.use("/", require("./v1/view.routes"));
};

module.exports = initializeRoutes;
