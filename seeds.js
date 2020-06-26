const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment")

const data = [
  {
    name: "Red Creek",
    image:
      "https://images.unsplash.com/photo-1562104460-b44b08f33a76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    description: "Coxswain scuppers booty coffer swing the lead Davy Jones' Locker. Sea Legs rum main sheet gangplank reef sails scuttle. Weigh anchor swab port scurvy Barbary Coast stern. Red ensign heave down keel Barbary Coast spanker league. Aft Admiral of the Black parrel grog yardarm doubloon. Spirits lookout case shot heave to squiffy black spot. Bring a spring upon her cable overhaul furl fore Shiver me timbers gabion. Overhaul strike colors Corsair handsomely hail-shot code of conduct."
  },
  {
    name: "Black Creek",
    image:
      "https://images.unsplash.com/photo-1531413458726-dffc1fff8067?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    description: "Hogshead landlubber or just lubber Chain Shot heave down Sea Legs gangplank. Smartly ahoy long boat strike colors crack Jennys tea cup jury mast. Pirate Sail ho gally Jack Ketch lugger splice the main brace. Provost bilge sloop bucko stern walk the plank. Gabion jolly boat strike colors Buccaneer hands port. Transom prow piracy lass Buccaneer avast. ",
  },
  {
    name: "Winter Creek",
    image:
      "https://images.unsplash.com/photo-1547933394-cec4873f817c?ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80",
    description: "Better to camp in the summer.Hogshead landlubber or just lubber Chain Shot heave down Sea Legs gangplank. Smartly ahoy long boat strike colors crack Jennys tea cup jury mast. Pirate Sail ho gally Jack Ketch lugger splice the main brace. Provost bilge sloop bucko stern walk the plank. Gabion jolly boat strike colors Buccaneer hands port. Transom prow piracy lass Buccaneer avast. ",
  },
  {
    name: "Gulf Coast Beach",
    image:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
    description: "Hogshead landlubber or just lubber Chain Shot heave down Sea Legs gangplank. Smartly ahoy long boat strike colors crack Jennys tea cup jury mast. Pirate Sail ho gally Jack Ketch lugger splice the main brace. Provost bilge sloop bucko stern walk the plank. Gabion jolly boat strike colors Buccaneer hands port. Transom prow piracy lass Buccaneer avast. ",
  },
];

function seedDB() {
  //empty db
  Campground.remove({}, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("removed all campgrounds in database ");
    //add some campgrounds
    data.forEach(function (seed) {
      Campground.create(seed, function (err, campground) {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create(
            {
              text: "New comment",
              author: "Homer Simpson",
            },
            function (err, comment) {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("comment created");
              }
            }
          );
        }
      });
    });
  });
}

module.exports = seedDB;
