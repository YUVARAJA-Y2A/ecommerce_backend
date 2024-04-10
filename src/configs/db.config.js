require("dotenv").config();
const mongoose = require("mongoose");

module.exports = async () => {
  mongoose.connect(process.env.MONGO_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  });
  let db = mongoose.connection;
  db.on("error", err => {
    console.log(err, "MongoDB connection error. Please make sure MongoDB is running");
    process.exit();
  });
  db.once("open", function () {
    console.log("Database connected successfully.");
  });
}    