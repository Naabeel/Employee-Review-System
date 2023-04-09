const mongoose = require("mongoose");

const dotenv = require("dotenv").config();
// mongoose.set("strictQuery", true);
// const URI = process.env.dburl;
// console.log(URI);

mongoose.connect(process.env.dburl);
const db = mongoose.connection;
// console.log(process.env.dburl);

db.on("error", function () {
  console.log("error in connecting to database");
  return;
});

db.once("open", function () {
  console.log("connected to database");
});
