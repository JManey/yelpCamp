const mongoose = require("mongoose");

let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

// ========= Pre Hook the model allows to delete its comments
//========== when the campground is deleted
const Comment = require("./comment");
campgroundSchema.pre("remove", async function () {
  console.log("pre function inside campground model");
  await Comment.deleteMany({
    _id: {
      $in: this.comments,
    },
  });
});

module.exports = mongoose.model("Campground", campgroundSchema);
