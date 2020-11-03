const express = require("express");

const router = express.Router();
const Post = require("../models/Post")

router.post("/", async (req, res) => {
  const { userId, message , dateTime } = req.body;
  try {
    let post = new Post({
      userId: userId,
      dateTime: dateTime,
      message: message,
    });
    await post.save();
    res.send(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
