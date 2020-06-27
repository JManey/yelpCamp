const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");

// index route
router.get("/", function (req, res) {
    // console.log(req.user)
    // get campgrounds
    Campground.find({}, function (err, campgrounds) {
      if (err) {
        console.log(err);
      } else {
        res.render("campgrounds/index", { campgrounds: campgrounds, currentUser: req.user });
      }
    });
  });
  
  //new form route
  router.get("/new", function (req, res) {
    res.render("campgrounds/new");
  });
  
  //route to save new campground
  router.post("/", function (req, res) {
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
  router.get("/:id", function (req, res) {
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

  module.exports = router;