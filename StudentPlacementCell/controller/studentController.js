const Students = require("../models/student");

module.exports.add = async function (req, res) {
  try {
    let student = await Students.create(req.body);
    res.status(200).json({
      data: { student },
      message: "Student added successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Student couldnt be added",
    });
  }
};
module.exports.updateStatus = async function (req, res) {
  //function to update the status of students, wether placed or not
  try {
    let student = await Students.findOneAndUpdate(
      {
        _id: req.body.student_id,
      },
      {
        status: req.body.status,
      },
      {
        returnDocument: "after",
      }
    );
    res.status(200).json({
      data: { student },
      message: "Student status updated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Student couldnt be updated",
    });
  }
};
