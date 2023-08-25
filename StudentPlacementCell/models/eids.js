const mongoose = require("mongoose");

const eidSchema = new mongoose.Schema({
  eid: {
    type: String,
    require: true,
    unique: true,
  },
});

const Eids = mongoose.model("eids", eidSchema);
module.exports = Eids;
