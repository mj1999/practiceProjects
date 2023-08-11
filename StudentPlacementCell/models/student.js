const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requied: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    college: {
      type: String,
      requied: true,
    },
    batch: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "not_placed",
      enum: ["placed", "not_placed"],
    },
    DSA_score: {
      type: String,
      required: true,
    },
    webD_score: {
      type: String,
      required: true,
    },
    react_score: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Students = mongoose.model("Students", studentSchema);
module.exports = Students;
