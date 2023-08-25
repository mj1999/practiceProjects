//imports and declarations
const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/db_config");
const layout = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const flashMiddleware = require("./config/flash_middleware");
const passport = require("passport");
const passportLocal = require("./config/passport_local");
//form data decoding
app.use(express.urlencoded());

//static files
app.use(express.static("./assets"));

//layouts
app.use(layout);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//view-engine
app.set("view engine", "ejs");
app.set("views", "./views");

//session
app.use(
  session({
    name: "SPC-session",
    secret: "toor",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017",
      autoRemove: "disabled",
    }),
  })
);

//passport initialization and middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthUser);

//flash notifications
app.use(flash());
app.use(flashMiddleware.setFlash);

//routes redirection
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error starting the server : ", err);
    return;
  }
  console.log("Server started on port :", port);
});
