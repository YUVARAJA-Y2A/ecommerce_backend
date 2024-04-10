const express = require("express");
const viewRoutes = express.Router();

// verifyToken.validateToken,
viewRoutes.get("/", (req, res) => {
  res.render("home", { layout: "layout" });
});
viewRoutes.get("/login", (req, res) => {
  res.render("login", { layout: "layout" });
});
viewRoutes.get("/register", (req, res) => {
  res.render("signup", { layout: "layout" });
});
viewRoutes.get("/cart", (req, res) => {
  res.render("cart", { layout: "layout" });
});
viewRoutes.get("/orders", (req, res) => {
  res.render("order", { layout: "layout" });
});
module.exports = viewRoutes;
