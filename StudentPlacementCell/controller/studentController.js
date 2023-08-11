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
