const helmet = require("helmet");
const express = require("express");
const routers = require("./src/routes");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

// middle wares section

const { handler } = require("./src/middleware/errorHandler");
const { CustomLogger } = require("./src/middleware/customLogger");
let appLogger = new CustomLogger();

// EJS setup
const path = require("path");
const viewsPath = path.join(__dirname, "src/views");

const port = process.env.PORT || 2119;
const args = process.argv.slice(2)[0];

const app = express();
app.use(helmet());
app.use(appLogger.requestDetails(appLogger));

app.use(express.static(path.join(__dirname, "/public")));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // This allows inline scripts, you should avoid it in production.
        "https://code.jquery.com",
        "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js",
      ],
      styleSrc: [
        "'self'",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
      ],
    },
  })
);

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", viewsPath);

if (args) {
  let CONFIG = require("./src/configs/config")(args);

  if (["PREPROD", "PROD"].indexOf(args) > -1) {
    client.getSecretValue(
      { SecretId: CONFIG.SECRET_KEY },
      function (err, data) {
        if (err) {
          console.log("Error", err);
          throw err;
        } else {
          if ("SecretString" in data) {
            let connectionUrl = JSON.parse(data.SecretString);
            console.log("Secrret connectionUrl port ", connectionUrl.port);
            process.env.MONGO_URL = `mongodb://${connectionUrl.username}:${connectionUrl.password}@${connectionUrl.host}:${connectionUrl.port}/${CONFIG.DB_NAME}?replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`;

            const options = {
              explorer: false,
              swaggerOptions: {
                validatorUrl: null,
              },
              customSiteTitle: "",
              customfavIcon: "",
            };

            app.use(
              "/docs",
              swaggerUi.serve,
              swaggerUi.setup(swaggerDocument, options)
            );

            app.listen(port, () =>
              console.log(`Backend listening at http://localhost:${port}`)
            );
          }
        }
      }
    );
  } else {
    app.listen(port, () =>
      console.log(`Backend listening at http://localhost:${port}`)
    );
  }

  // middleware section
  app.use(appLogger.requestDetails(appLogger));
  routers(app);
  app.use(handler);

  process.on("uncaughtException", function (err) {
    console.log("whoops! There was an uncaught error", err);
  });

  process.on("unhandledRejection", function (reason, promise) {
    console.log("Unhandled rejection", { reason: reason, promise: promise });
  });
}
