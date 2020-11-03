const express = require("express");
const router = express.Router();
const Post = require("../models/Post")

router.post(
  "/",

  async (req, res) => {
    const postId = req.body;
    try {
      await Post.findOneAndDelete({ _id: postId._id }, function (err) {
        if (err) console.log(err);
      });
      res.send(postId);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error...");
    }
  }
);

module.exports = router;
