const express = require("express");
const router = express.Router();
const FriendRequest = require("../models/FriendRequest")

router.post(
  "/",

  async (req, res) => {
    const requestId = req.body;
    try {
      await FriendRequest.findOneAndDelete({ _id: requestId.id }, function (err) {
        if (err) console.log(err);
      });
      res.send("Success");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error...");
    }
  }
);

module.exports = router;
