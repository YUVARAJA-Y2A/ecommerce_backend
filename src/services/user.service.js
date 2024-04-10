const { user } = require("../database/models");
const getPagingData = require("../utils/pagination");
const { statusCodes, messages } = require("../configs");
const { errorObjGenerator } = require("../middleware").errorHandler;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../middleware/logger");

class UserService {}

UserService.createUser = async (input) => {
  try {
    let hashedPassword = bcrypt.hashSync(input.password, 10);
    let result = await user.create({ ...input, password: hashedPassword });

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

UserService.signIn = async (input) => {
  try {
    let signInUser = await user.find({ email: input.email });
    let decryptedPass = bcrypt.compareSync(
      input.password,
      signInUser[0].password
    );

    if (!decryptedPass) {
      return {
        code: statusCodes.HTTP_BAD_REQUEST,
        message: messages.loginFailed,
        data: {},
      };
    } else {
      let token = jwt.sign({ id: signInUser[0]._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      });
      const { _id, firstname, lastname, email, gender, mobilenumber } =
        signInUser[0];
      return {
        code: statusCodes.HTTP_OK,
        message: messages.success,
        data: {
          data: {
            userId: _id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender,
            mobilenumber: mobilenumber,
          },
          access_token: token,
        },
      };
    }
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

UserService.editUserData = async (input) => {
  try {
    let result = await user.findOneAndUpdate({ id: input.id }, input, {
      new: true,
    });
    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

UserService.getAllUsers = async (input) => {
  try {
    let { page, size, id } = input;

    let condition = {};
    if (id) condition.id = id;
    let { limit, offset } = getPagingData(page, size);

    let result = await user.find(condition).limit(limit).skip(offset);
    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    logger.info({
      message: "@Service user.service @Method getAllUsers @Message ERROR",
      data: err,
    });
    throw errorObjGenerator(err);
  }
};

UserService.getUser = async (input) => {
  try {
    let User = await user.find({ email: input.email });

    if (User.length > 0) {
      const { firstname, lastname, email, ...rest } = User[0];
      let result = { firstname: firstname, lastname: lastname, email: email };
      return {
        code: statusCodes.HTTP_OK,
        message: messages.success,
        data: result ? result : {},
      };
    } else {
      return {
        code: 404,
        message: "User not exists",
      };
    }
  } catch (err) {
    logger.info({
      message: "@Service user.service @Method getAllUsers @Message ERROR",
      data: err,
    });
    throw errorObjGenerator(err);
  }
};

module.exports = UserService;
