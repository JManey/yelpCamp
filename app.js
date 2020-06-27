const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  PORT = 3000,
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  methodOverride = require("method-override");

User = require("./models/user");

//require routes
const commentRoutes = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");

// load the env vars
require("dotenv").config();
// connect to the MongoDB with mongoose
require("./config/database");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//middleware
// this is how to get rec.body working in express
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

// =============
// passport config
app.use(
  require("express-session")({
    secret: "Ginger and Tracy are my Best Girls today",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//awesome middleware adds the username to all routes
//so that templates will have the variable currentUser
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

//seed db
// seedDB();

//============================
//       ROUTES
//************************************* */

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(PORT, function () {
  console.log(`server listening at port: ${PORT}`);
});
