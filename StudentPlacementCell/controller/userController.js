module.exports.addUser = async function (req, res) {
  const newUser = await User.create(req.body);
  req.flash("success", "User " + newUser.name + " created successfully");
  console.log(newUser);
  res.redirect("/auth/login");
};
