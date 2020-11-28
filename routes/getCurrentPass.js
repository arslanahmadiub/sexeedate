const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  let data = req.body;

  try {
    const result = await Profile.findOne({ _id: data.userId });
    let pass = result.password;
    let validPassword = await bcrypt.compare(data.password, pass);
    if (validPassword) {
      res.send("Password Matach");
    } else {
      res.send("Password Not Matach");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
