const express = require("express");
const router = express.Router(); //{ mergeParams: true }
const Campground = require("../models/campground");
const middleware = require("../middleware/index");

// index route
router.get("/", async (req, res, next) => {
  // get campgrounds
  try {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", {
      campgrounds: campgrounds,
      currentUser: req.user,
    });
  } catch (error) {
    return next(error);
  }
});

//new form route
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

//route create new campground
router.post("/", middleware.isLoggedIn, async function (req, res) {
  //get data from from and push to array
  let author = {
    id: req.user._id,
    username: req.user.username,
  };
  let newCampground = {
    name: req.body.campground.name,
    image: req.body.campground.image,
    description: req.body.campground.description,
    price: req.body.campground.price,
    author: author,
  };
  try {
    await Campground.create(newCampground);
    res.redirect("/campgrounds");
  } catch (error) {
    console.log("newly created campground:", campground);
    next(error);
  }
});

// show route for campground
router.get("/:id", async (req, res, next) => {
  //get campground
  try {
    const campground = await Campground.findById(req.params.id)
      .populate("comments")
      .exec()
      .then((campground) => {
        res.render("campgrounds/show", { campground: campground });
      });
  } catch (error) {
    next(error);
  }
});

// edit form route
router.get(
  "/:id/edit",
  middleware.checkCampgroundOwnership,
  async (req, res, next) => {
    try {
      const campground = await Campground.findById(req.params.id); //, function (err, campground) {
      res.render("campgrounds/edit", { campground: campground });
    } catch (error) {
      next(error);
    }
  }
);

// update route
router.put("/:id", middleware.checkCampgroundOwnership, async (req, res) => {
  try {
    await Campground.findByIdAndUpdate(req.params.id, req.body.campground);
    res.redirect("/campgrounds/" + req.params.id);
  } catch (error) {
    // res.redirect("/campgrounds");
    next();
  }
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
