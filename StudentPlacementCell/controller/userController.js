const Eids = require("../models/eids");
const User = require("../models/users");

module.exports.addUser = async function (req, res) {
  console.log("inside");
  const eid = await Eids.findOne({ eid: req.body.eid });
  console.log(eid);
  if (eid) {
    const newUser = await User.create(req.body);
    req.flash("success", "User " + newUser.name + " created successfully");
    console.log(newUser);
    res.redirect("/auth/login");
  } else {
    req.flash("success", "Employee id not valid");
    res.redirect("/auth/register");
  }
};
