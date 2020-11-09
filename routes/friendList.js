const express = require("express");

const router = express.Router();
const FriendList = require("../models/FriendList");

router.post("/", async (req, res) => {
  const { userId, friends } = req.body;
  try {
    let friendList = new FriendList({
      userId,
      friends,
    });

    let user = await FriendList.find({ userId: userId });

    if (user.length < 1) {
      await friendList.save();
      res.send("success");
    } else {
      let result = await FriendList.updateOne(
        { userId: req.body.userId },
        { $push: { friends: req.body.friends } }
      );
      res.send(result);

    }
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
