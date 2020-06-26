const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000;

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
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
  ];
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(PORT, function () {
  console.log(`server listening at port: ${PORT}`);
});
