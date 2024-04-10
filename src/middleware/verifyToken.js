"use strict";

const jwt = require("jsonwebtoken");
const { messages, statusCodes } = require("../configs");
const unAuthorizedResponse = {
  status: statusCodes.HTTP_UNAUTHORIZED,
  message: messages.unAuthorized,
};

module.exports = {
  validateToken: async (req, res, next) => {
    // try {
    //   // Below code needs to be implement
    //   /* const tokenCreationTime = Math.floor(Date.now() / 1000);
    //   const payload = { iss: process.env.DOODLEBLUE_API_KEY, iat: tokenCreationTime };
    //   const token = jwt.sign(payload, process.env.JWT_SECRET); */
    //   const apiKey = req.headers['x-api-key'];
    //   const token = req.headers['x-api-token'];
    //   if (token == null) {
    //     next(unAuthorizedResponse)
    //   }
    //   jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    //     if (err) {
    //       next(unAuthorizedResponse);
    //     } else {
    //       //Check for apiKey
    //       if ((apiKey != process.env.DOODLEBLUE_API_KEY) || (data.iss != process.env.DOODLEBLUE_API_KEY)) {
    //         next(unAuthorizedResponse);
    //       }
    //       req.isAuthenticated = true;
    //       next();
    //     }
    //   });
    // } catch (err) {
    //   console.error("@Middleware @Method validateToken @Message ERROR: ", { data: err.message });
    //   next(unAuthorizedResponse);
    // }

    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (token == null) {
        next(unAuthorizedResponse);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          next(unAuthorizedResponse);
        }
        req.user = user;
        next();
      });
    } catch (err) {
      console.log("error msgs", err.message);
      next(unAuthorizedResponse);
    }
  },
};
