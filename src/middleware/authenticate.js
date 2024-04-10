"use strict";

const { messages, statusCodes } = require("../configs");
const unAuthorizedResponse = {
  status: statusCodes.HTTP_UNAUTHORIZED,
  message: messages.unauthorized,
};

module.exports = {
  authenticateUser: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == undefined) {
        req.user = {
          isAuthenticed: false,
        };
        next();
      } else {
        next();
      }
    } catch (err) {
      next(unAuthorizedResponse);
    }
  },
};
