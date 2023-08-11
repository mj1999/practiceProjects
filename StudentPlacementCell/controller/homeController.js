const Students = require("../models/student");
const Interviews = require("../models/interviews");

module.exports.home = async function (req, res) {
  let all_students = await Students.find({}).sort({ name: 1 });
  let all_interviews = await Interviews.find({})
    .populate("students")
    .sort("date");
  res.render("home", { all_students, all_interviews });
};
