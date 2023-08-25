const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: true,
    },
  ],
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Results",
    },
  ],
});

const Interviews = mongoose.model("Interviews", interviewSchema);
module.exports = Interviews;
