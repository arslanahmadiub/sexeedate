const express = require("express");

const router = express.Router();
const Covid = require("../models/Covid");

router.post("/", async (req, res) => {
  const { userId, question1,question2,question3,question4,question5 } = req.body;
  try {
    let covid = new Covid({
      userId,
      question1,
      question2,
      question3,
      question4,
      question5,
    });
    let id_avail = await Covid.findOne({ userId: covid.userId });
    if (id_avail)
      await Covid.updateMany(
        { userId: userId },
        {
            question1,
            question2,
            question3,
            question4,
            question5
        },

        res.send("Success!")
      );
    else {
      await covid.save();
      res.send(covid);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
