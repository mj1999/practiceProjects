const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/SPC");

const db = mongoose.connection;

db.on("open", () => {
  console.log("Connected to db");
});

db.on("error", (err) => {
  console.log("err connecting to db:", err);
});

module.exports = db;
