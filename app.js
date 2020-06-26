const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  PORT = 3000,
  Campground = require("./models/campground"),
  seedDB = require("./seeds")


//seed db
seedDB();

// load the env vars
require("dotenv").config();
// connect to the MongoDB with mongoose
require("./config/database");

app.set("view engine", "ejs");

//middleware
// this is how to get rec.body working in express
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies





//************************************* */

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
      res.render("index", { campgrounds: campgrounds });
    }
  });
});

//route to add campground form
app.get("/campgrounds/new", function (req, res) {
  res.render("new");
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
  Campground.create(newCampground, function(err, campground){
    if(err){
      console.log(err)
    } else {
      res.redirect("/campgrounds")
    }
  })
});

// show route for campground
app.get("/campgrounds/:id", function (req, res) {
  //get campground
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show",{campground: campground});
    }
  });
});

app.listen(PORT, function () {
  console.log(`server listening at port: ${PORT}`);
});
