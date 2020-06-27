const express = require("express");
const router = express.Router({ mergeParams: true }); //brings in req.params
const Campground = require("../models/campground");
const Comment = require("../models/comment");


//**** new comment form ********** */
router.get("/new", isLoggedIn, function (req, res) {
  console.log(req.params.id);
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

/* ********* create new comment **************** */
router.post("/", isLoggedIn, function (req, res) {
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
          //add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          //save comment
          comment.save();

          //connect comment to campgroud
          campground.comments.push(comment);
          campground.save();
          console.log(comment)
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
  //redirect
});

// middleware function
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
