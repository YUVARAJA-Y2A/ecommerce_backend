const { product } = require("../database/models");
const getPagingData = require("../utils/pagination");
const { statusCodes, messages } = require("../configs");
const { errorObjGenerator } = require("../middleware").errorHandler;
const excelParser = require("../middleware/excelParser");
const logger = require("../middleware/logger");

class ProductService {}

ProductService.createProduct = async () => {
  try {
    let excelToJson = excelParser("src/uploads/Products.xlsx");
    let result = await product.create(excelToJson);
    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

ProductService.createProductItem = async (input) => {
  try {
    let result = await product.create(input);
    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

ProductService.editProduct = async (input) => {
  try {
    let result = await product.findOneAndUpdate({ _id: input.id }, input, {
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

ProductService.removeProduct = async (input) => {
  try {
    let result = await product.findByIdAndDelete({ _id: input.id });

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    throw errorObjGenerator(err);
  }
};

ProductService.getAllProducts = async (input) => {
  try {
    let { page, size, id } = input;

    let condition = {};
    if (id) condition._id = id;
    let { limit, offset } = getPagingData(page, size);

    let result = await product.find(condition).limit(limit).skip(offset);
    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: result ? result : {},
    };
  } catch (err) {
    logger.info({
      message: "@Service user.service @Method getAllItems @Message ERROR",
      data: err,
    });
    throw errorObjGenerator(err);
  }
};

ProductService.getSearchAndSortProducts = async (input) => {
  try {
    let { page, size, id, sortOrder } = input;

    let condition = {};
    if (id) condition._id = id;

    // ii. Queries with conditions such as >, <, IN, etc.
    if (input.minPrice) condition.item_price = { $gt: input.minPrice };
    if (input.largeQuantity) condition.quantity = { $gt: input.largeQuantity };

    // iv. Queries involving string expressions.
    if (input.search) {
      condition.$or = [{ item_name: { $regex: input.search, $options: "i" } }];
    }

    let { limit, offset } = getPagingData(page, size);

    // i. Simple queries to retrieve the information.
    let query = product.find(condition).limit(limit).skip(offset);

    // Sorting

    query = query.sort({ ["item_id"]: sortOrder === "desc" ? -1 : 1 });

    let result = await query;

    // v. Queries with aggregation pipeline.
    let aggregationPipeline = [
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ];

    let totalQuantity = await product.aggregate(aggregationPipeline);

    return {
      code: statusCodes.HTTP_OK,
      message: messages.success,
      data: {
        products: result ? result : [],
        totalQuantity:
          totalQuantity.length > 0 ? totalQuantity[0].totalQuantity : 0,
      },
    };
  } catch (err) {
    logger.info({
      message: "@Service user.service @Method getAllItems @Message ERROR",
      data: err,
    });
    throw errorObjGenerator(err);
  }
};

module.exports = ProductService;
