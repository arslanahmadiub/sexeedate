const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
    let id = req.body.userId
  try {
    const data = await Profile.find({_id:id});
    res.send(data[0].gender);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
 
});
module.exports = router;
