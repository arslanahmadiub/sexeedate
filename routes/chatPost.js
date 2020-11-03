const express = require("express");

const router = express.Router();
const Chat = require("../models/Chat")

router.post("/", async (req, res) => {
  const { senderId, receiverId , message } = req.body;
  try {
    let chat = new Chat({
      senderId: senderId,
      receiverId: receiverId,
      message: message,
    });
  

    await chat.save();
    res.send(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
