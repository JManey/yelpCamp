const express = require("express");
const router = express.Router({ mergeParams: true }); //brings in req.params
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware/index");

//**** new comment form ********** */
router.get("/new", middleware.isLoggedIn, function (req, res) {
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
router.post("/", middleware.isLoggedIn, function (req, res) {
  //lookup campground using id
  Campground.findById(req.params.id, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      //create new comment
      Comment.create(req.body.comment, function (err, comment) {
        if (err) {
          res.flash("error", "Oops, something went wrong.")
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
          console.log("in create new comment route", comment);
          res.flash("success", "Thanks for leaving a comment!")
          res.redirect("/campgrounds/" + campground._id);
        }
      });
    }
  });
  //redirect
});

// ===== edit route =====
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, comment) {
    if (err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {
        campground_id: req.params.id,
        comment: comment,
      });
    }
  });
});

// ===== handle update comment ======
router.put("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (
    err,
    comment
  ) {
    if (err) {
      res.redirect("back");
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// ==== destroy route =====
router.delete("/:comment_id", middleware.checkCommentOwnership, function (req, res) {
  Comment.findByIdAndRemove(req.params.comment_id, function (err) {
    if (err) {
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted.")
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;
