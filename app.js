const express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  PORT = 3000;

// load the env vars
require("dotenv").config();
// connect to the MongoDB with mongoose
require("./config/database");

app.set("view engine", "ejs");

//middleware
// this is how to get rec.body working in express
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies

//temp db ***********************
// fefactor later
// schema setup

let campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
});
let Campground = mongoose.model("Campground", campgroundSchema);
//test
Campground.create(
  {
    name: "Salmon Creek",
    image: "https://live.staticflickr.com/4156/34533119056_51fca34dff_b.jpg",
  },
  function (err, campground) {
    if (err) {
      console.log("oh no", err);
    } else {
      console.log("made a new campground");
      console.log(campground);
    }
  }
);

//************************************* */
let campgrounds = [
  {
    name: "salmon creek",
    image: "https://live.staticflickr.com/4156/34533119056_51fca34dff_b.jpg",
  },
  {
    name: "red deer creek",
    image: "https://live.staticflickr.com/7570/16155826112_007ffaf4ea_b.jpg",
  },
  {
    name: "lake austin ",
    image: "https://live.staticflickr.com/3396/3653409750_cde4150238_b.jpg",
  },
  {
    name: "salmon creek",
    image: "https://live.staticflickr.com/4156/34533119056_51fca34dff_b.jpg",
  },
  {
    name: "red deer creek",
    image: "https://live.staticflickr.com/7570/16155826112_007ffaf4ea_b.jpg",
  },
  {
    name: "lake austin ",
    image: "https://live.staticflickr.com/3396/3653409750_cde4150238_b.jpg",
  },
  {
    name: "salmon creek",
    image: "https://live.staticflickr.com/4156/34533119056_51fca34dff_b.jpg",
  },
  {
    name: "red deer creek",
    image: "https://live.staticflickr.com/7570/16155826112_007ffaf4ea_b.jpg",
  },
  {
    name: "lake austin ",
    image: "https://live.staticflickr.com/3396/3653409750_cde4150238_b.jpg",
  },
];

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

app.post("/campgrounds", function (req, res) {
  //get data from from and push to array
  // console.log(req.body)
  // console.log(req.body.image)
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {
    name: name,
    image: image,
  };
  // add newCampground to array
  campgrounds.push(newCampground);
  res.redirect("campgrounds");
});

app.listen(PORT, function () {
  console.log(`server listening at port: ${PORT}`);
});
