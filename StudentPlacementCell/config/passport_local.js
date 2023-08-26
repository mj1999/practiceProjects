const passport = require("passport");
const LocalStrat = require("passport-local").Strategy;
const Users = require("../models/users");

passport.use(
  new LocalStrat(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      Users.findOne({ email })
        .then((user) => {
          if (!user || user.password != password) {
            req.flash("error", "Invalid username/password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("error finding user in db: ", err);
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  Users.findById(id)
    .then((user) => done(null, user))
    .catch((err) => {
      console.log("user not found", err);
      return done(err, false);
    });
});

// middleware that adds user to the locals object if req.isauthenticated returns true
passport.setAuthUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
