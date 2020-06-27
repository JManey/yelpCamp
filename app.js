const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  PORT = 3000,
  Campground = require("./models/campground"),
  Comment = require("./models/comment"),
  seedDB = require("./seeds"),
  passport = require("passport"),
  LocalStrategy = require("passport-local");
User = require("./models/user");

// load the env vars
require("dotenv").config();
// connect to the MongoDB with mongoose
require("./config/database");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

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

//============================

//************************************* */
//seed db
seedDB();

//route to landing page
app.get("/", function (req, res) {
  res.render("landing");
});

//route to display all campgrounds
app.get("/campgrounds", function (req, res) {
  // get campgrounds
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: campgrounds });
    }
  });
});

//route to add campground form
app.get("/campgrounds/new", function (req, res) {
  res.render("campgrounds/new");
});

//route to save new campground
app.post("/campgrounds", function (req, res) {
  //get data from from and push to array
  // console.log(req.body)
  // console.log(req.body.image)
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let newCampground = {
    name: name,
    image: image,
    description: description,
  };
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// show route for campground
app.get("/campgrounds/:id", function (req, res) {
  //get campground
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function (err, campground) {
      if (err) {
        console.log(err);
      } else {
        // console.log(campground);
        res.render("campgrounds/show", { campground: campground });
      }
    });
});

// *********************************8
// comment routes
//*************************************
//**** new comment form ********** */
app.get("/campgrounds/:id/comments/new", function (req, res) {
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

/* ********* create new comment **************** */
app.post("/campgrounds/:id/comments", function (req, res) {
  //lookup campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          console.log(err);
        } else {
          //connect comment to campgroud
          campground.comments.push(comment);
          campground.save();
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
  //redirect
});

//====Auth Routes ======//

// show register form
app.get("/register", function (req, res) {
  res.render("register");
});

//handle sign up logic
app.post("/register", function (req, res) {
  let newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function () {
      res.redirect("/campgrounds");
    });
  });
});

app.listen(PORT, function () {
  console.log(`server listening at port: ${PORT}`);
});
