const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const objectID = require("mongoose").Types.ObjectId;

module.exports = {
  pagingData: require("./pagination"),
  cleanSensitiveData: function (data) {
    data.password ? (data.password = "") : data;
    return data;
  },
  mobileNumValidator: (value, helper) => {
    var mobileNumberRegex = /^[a-zA-Z0-9\-().\s]{10}$/gm;
    if (!value.match(mobileNumberRegex)) {
      return helper.message("Invalid Mobile Number");
    }
    return value;
  },
  currentDate: function (format = "YYYY-MM-DD") {
    return moment(new Date()).tz("Asia/kolkata").format(format);
  },
  currentTime: function (format = "HH:mm:ss") {
    return moment(new Date()).tz("Asia/kolkata").format(format);
  },
  currentDateTime: function () {
    return +moment(new Date()).tz("Asia/kolkata");
  },
  generateAccessToken: function (data) {
    // return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME });
    return jwt.sign(data, process.env.JWT_SECRET);
  },
  dateFormat: (date) => {
    let curDate = date.getDate();
    curDate = curDate <= 9 ? "0" + curDate : curDate;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${curDate}/${month}/${year}`;
  },
  objectIDValidator: (value, helper) => {
    if (!objectID.isValid(value)) {
      return helper.message("Invalid ObjectID");
    }
    return value;
  },
  conditionalLoader: (condition, value) => {
    return condition && value;
  },
  ternaryConditionalLoader: (condition, value1, value2) => {
    return condition ? value1 : value2;
  },
};
