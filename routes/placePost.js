
const express = require("express");

const router = express.Router();
const Place = require("../models/Place");

router.post("/", async (req, res) => {
  const { userId, currentCity, homeTown } = req.body;
  let place = new Place({
    userId: userId,
    currentCity: currentCity,
    homeTown: homeTown,
  });
  try {
    let id_avail = await Place.findOne({ userId: place.userId });
    if (id_avail)
      await Place.updateMany(
        { userId: userId },
        { currentCity: currentCity, homeTown: homeTown },

        await res.send("success")
      );
    else {
      await place.save();
      res.send(place);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
