const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  const userId = req.body.userId;
  try {
    let user = await Profile.findOne({ _id: userId });
    if (!user)
      return res.status(400).send("This User Not Exist...");
    else if(user.role =="Admin"){
        return res.status(200).send("Admin");
    }
    else if(user.role =="User"){
        return res.status(200).send("User");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
