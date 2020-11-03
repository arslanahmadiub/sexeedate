const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  const { userId, status} = req.body;
 
  try {
   
      await Profile.updateMany(
        { _id: userId },
        { status: status },

        await res.send("success")
      );
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
