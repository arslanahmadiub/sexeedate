const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");


router.post("/", async (req, res) => {
  const { userId, password } = req.body;
  try {

    const salt = await bcrypt.genSalt(10);
    let newPass=await bcrypt.hash(password, salt);
    await Profile.updateOne({ _id: userId }, { password: newPass });

    res.send("Update Sucess");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
