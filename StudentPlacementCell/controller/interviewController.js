const Students = require("../models/student");
const Interviews = require("../models/interviews");
const Results = require("../models/results");
const mongoose = require("mongoose");

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
  // function to allocate student to an interview , it adds student to the interview as well as adds an entry with default value for result for the results schema
  try {
    let student = await Students.findById(req.body.student_id);
    let result = await Results.create({
      interview: req.body.interview_id,
      student,
    });
    let interview = await Interviews.findByIdAndUpdate(req.body.interview_id, {
      $push: {
        students: student,
        results: result,
      },
    });
    result = await result.populate(["interview", "student"]);
    res.status(200).json({
      data: { student, result },
      message: "Student allocated to the interview",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Student couldnt be allocated",
    });
  }
};

module.exports.updateResult = async function (req, res) {
  // updates the result of the interview changing it from default value i.e. on hold
  try {
    let result = await Results.findOneAndUpdate(
      {
        student: req.body.student_id,
        interview: req.body.interview_id,
      },
      {
        result: req.body.result,
      },
      {
        returnDocument: "after",
      }
    );
    res.status(200).json({
      data: { result },
      message: "Result updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Interview result couldnt be updated",
    });
  }
};
