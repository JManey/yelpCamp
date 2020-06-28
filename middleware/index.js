// all middleware
const Campground = require("../models/campground");
const Comment = require("../models/comment");

const middlewareObj = {};

// check if user is campground author
middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  //is a user logged in
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function (err, campground) {
      if (err) {
        req.flash("error", "Campground not found.")
        res.redirect("back");
      } else {
        //is current user the campgroud author
        if (campground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that.")
          req.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You must be logged in to do that.")
    res.redirect("back");
  }
};

// check if user is comment author
middlewareObj.checkCommentOwnership = function (req, res, next) {
  //is a user logged in
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, comment) {
      if (err) {
        res.redirect("back");
      } else {
        //is current user the comment author
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that.")
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You must be logged in to do that.")
    res.redirect("back");
  }
};

// middleware function
middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in to do that.");
  res.redirect("/login");
};

module.exports = middlewareObj;
