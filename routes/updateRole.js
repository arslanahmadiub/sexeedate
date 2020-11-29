const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  let { email, role } = req.body;
  try {
    const data = await Profile.updateOne({ email: email }, { role: role });
    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
