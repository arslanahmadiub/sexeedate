const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

router.post("/", async (req, res) => {
  let data = req.body;

  try {
    const result = await Chat.find({
      $and: [{ senderId: data.senderId }, { receiverId: data.receiverId }],
    })
      .limit(1)
      .sort({ _id: -1 });
    if (result) {
      await Chat.updateMany(
        { _id: result[0]._id },
        {
          read: true,
        },

        res.send(result)
      );
    } else {
      res.send("No data found!");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
