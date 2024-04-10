module.exports = function (env) {
  const DEV_CONSTANTS = {
    PORT: 2192,
    MONGO_URL: "",
    NODE_ENV: process.env.NODE_ENV,
    200: "success",
    SECRET_KEY: "",
    DB_NAME: "kotak_backend",
  };
  const LOCAL_CONSTANTS = {
    PORT: 2192,
    MONGO_URL: "",
    NODE_ENV: process.env.NODE_ENV,
    200: "success",
    SECRET_KEY: "",
    DB_NAME: "kotak_backend",
  };

  const PROD_CONSTANTS = {
    //PORT: process.env.PORT,
    PORT: 27017,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    200: "success",
    SECRET_KEY: "backersdozen/prod/dev",
    DB_NAME: "kotak_backend",
  };

  const PREPROD_CONSTANTS = {
    //PORT: process.env.PORT,
    PORT: 27017,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    200: "success",
    SECRET_KEY: "backersdozen/preprod/dev",
    DB_NAME: "kotak_backend",
  };
  let envType;

  switch (env) {
    case "DEV":
      envType = DEV_CONSTANTS;
      break;
    case "LOCAL":
      envType = LOCAL_CONSTANTS;
      break;
    case "PROD":
      envType = PROD_CONSTANTS;
      break;
    case "PREPROD":
      envType = PREPROD_CONSTANTS;
      break;
    default:
      envType = { NA: "NA" };
      break;
  }
  return envType;
};
