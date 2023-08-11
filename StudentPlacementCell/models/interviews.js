const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    },
  ],
  result: {
    type: String,
    default: "On-hold",
    enum: ["Pass", "Fail", "On-hold", "Did not Attempt"],
  },
});

const Interviews = mongoose.model("Interviews", interviewSchema);
module.exports = Interviews;
