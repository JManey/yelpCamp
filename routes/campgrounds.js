const express = require("express");
const router = express.Router(); //{ mergeParams: true }
const Campground = require("../models/campground");
const middleware = require("../middleware/index");

// index route
router.get("/", function (req, res) {
  // get campgrounds
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: campgrounds,
        currentUser: req.user,
      });
    }
  });
});

//new form route
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

//route create new campground
router.post("/", middleware.isLoggedIn, function (req, res) {
  //get data from from and push to array
  let name = req.body.name;
  let image = req.body.image;
  let description = req.body.description;
  let author = {
    id: req.user._id,
    username: req.user.username,
  };
  let newCampground = {
    name: name,
    image: image,
    description: description,
    author: author,
  };
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      console.log("newly created campground:", campground);
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
        console.log("error from show route campground", err);
      } else {
        res.render("campgrounds/show", { campground: campground });
      }
    });
});

// edit form route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (
  req,
  res
) {
  Campground.findById(req.params.id, function (err, campground) {
    res.render("campgrounds/edit", { campground: campground });
  });
});

// update route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (
    err,
    campground
  ) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//delete DESTROY route
router.delete("/:id", middleware.checkCampgroundOwnership, async function (
  req,
  res
) {
  try {
    let campground = await Campground.findById(req.params.id);
    await campground.remove();
    res.redirect("/campgrounds");
  } catch (err) {
    res.redirect("/campgrounds");
  }
});

module.exports = router;
