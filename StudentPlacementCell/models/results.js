//Model for results that forms a relation between student and interview and its result

const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  interview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Interviews",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Students",
  },
  result: {
    type: String,
    default: "On-hold",
    enum: ["Pass", "Fail", "On-hold", "Did not Attempt"],
  },
});

const Results = mongoose.model("Results", resultSchema);

module.exports = Results;
