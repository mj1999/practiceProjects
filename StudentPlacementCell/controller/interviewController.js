const Students = require("../models/student");
const Interviews = require("../models/interviews");
module.exports.create = async function (req, res) {
  try {
    let interview = await Interviews.create({
      company: req.body.company,
      date: req.body.date,
    });
    let students = await Students.find({});
    res.status(200).json({
      data: { interview, students },
      message: "Interview added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Interview couldnt be added",
    });
  }
};
module.exports.allocateStudent = async function (req, res) {
  try {
    let student = await Students.findById(req.body.student_id);
    let interview = await Interviews.findByIdAndUpdate(req.body.interview_id, {
      $push: { students: req.body.student_id },
    });
    res.status(200).json({
      data: { student, interview },
      message: "Student allocated to the interview",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Student couldnt be allocated",
    });
  }
};
