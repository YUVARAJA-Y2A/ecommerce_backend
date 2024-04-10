const utils = require("../utils");
const Joi = require("joi").extend(require("@joi/date"));

const signUpSchema = Joi.object({
  firstname: Joi.string().min(2).max(15).required(),
  lastname: Joi.string().min(1).max(15).required(),
  mobilenumber: Joi.string()
    .length(10)
    .regex(/^[0-9]+$/)
    .required(),
  gender: Joi.string().min(4).max(6).required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .required(),
  confirmpassword: Joi.ref("password"),
  dob: Joi.date().greater(new Date("01-01-2012")).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string()
    .min(8)
    .regex(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/))
    .required(),
});

const getUserSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

module.exports = {
  signUpSchema,
  signInSchema,
  getUserSchema,
};
