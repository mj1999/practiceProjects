// A model defining employee ids structure that are stored in the database and based on which if Eid is present in the database a new account is created else account is not created
// Database documents can be sourced from a different application or documents can be pre inputed into the database directly

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
