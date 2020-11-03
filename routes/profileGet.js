const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.get("/", async (req, res) => {
  try {
    const data = await Profile.aggregate([
      { $project : { firstName : 1, lastName : 1, email:1, gender:1,status:1 } },

    ]);
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
 
});
module.exports = router;
