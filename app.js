const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

//middleware
app.use(express.urlencoded({ extended: false })); //Parse URL-encoded bodies

//temp db
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

// ********************************

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
