const express = require("express");

const router = express.Router();
const FriendRequest = require("../models/FriendRequest");

router.post("/", async (req, res) => {
  const { senderId, receiverId, friendStatus } = req.body;
  try {
    let friendRequest = new FriendRequest({
      senderId,
      receiverId,
      friendStatus,
    });

    await friendRequest.save();
    res.send(friendRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
