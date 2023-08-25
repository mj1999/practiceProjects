const Students = require("../models/student");
const Interviews = require("../models/interviews");
const Result = require("../models/results");
const csvWriter = require("../config/csv_config");
const fs = require("fs");
const dir = "assets/csv/record.csv";

module.exports.home = async function (req, res) {
  let all_students = await Students.find({}).sort({ name: 1 });
  let all_interviews = await Interviews.find({})
    .populate({
      path: "results",
      populate: {
        path: "student",
      },
    })
    .populate({
      path: "results",
      populate: {
        path: "interview",
      },
    })
    .sort("date");
  res.render("home", { all_students, all_interviews });
};

module.exports.downloadCSV = async function (req, res) {
  let result = await Result.find({}).populate(["interview", "student"]);
  if (fs.existsSync(dir)) {
    fs.unlinkSync(dir);
  }
  await csvWriter.writeRecords(result);
  console.log("Write to CSV completed");
  res.download(dir);
};
