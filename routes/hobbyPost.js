const express = require("express");

const router = express.Router();
const Hobby = require("../models/Hobby");

router.post("/", async (req, res) => {
  const { userId, hobbies } = req.body;
  try {
    let work = new Hobby({
      userId: userId,
      hobbies: hobbies,
    });
    let id_avail = await Hobby.findOne({ userId: work.userId });
    if (id_avail)
      await Hobby.updateMany(
        { userId: userId },
        {
          hobbies: hobbies,
        },

        res.send("Success!")
      );
    else {
      await work.save();
      res.send(work);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
