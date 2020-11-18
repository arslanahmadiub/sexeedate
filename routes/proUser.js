const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const { userId, subStatus, subDate } = req.body;
  try {
    let user = await Profile.findOne({ _id: userId });
    if (user) {
      let newUser = await Profile.updateMany(
        { _id: mongoose.Types.ObjectId(userId) },
        {
          subStatus: subStatus,
          subOverDate: subDate,
        }
      );
      res.send(newUser);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
