const express = require("express");

const router = express.Router();
const DislikeList = require("../models/DislikeList");

router.post("/", async (req, res) => {
  const { userId, friends } = req.body;
  try {
    let dislik = new DislikeList({
      userId,
      friends,
    });

    let user = await DislikeList.find({ userId: userId });

    if (user.length < 1) {
      await dislik.save();
    }

    if (user.length > 0) {
      let result = await DislikeList.updateOne(
        { userId: req.body.userId },
        { $push: { friends: req.body.friends } }
      );
    }

    res.send("Success");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
