const User = require("../models/users");

module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
    return;
  }
  res.render("login");
};
module.exports.register = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/");
    return;
  }
  res.render("register");
};
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("error logging out", err);
    }
  });
  req.flash("success", "User logged out successfully");
  res.redirect("/");
};
module.exports.createSession = function (req, res) {
  if (req.isAuthenticated()) {
    req.flash("success", "login successfull");
    res.redirect("/");
    return;
  }
  res.redirect("/auth/login");
};
