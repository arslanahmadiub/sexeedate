const express = require("express");

const router = express.Router();
const Work = require("../models/Work");

router.post("/", async (req, res) => {
  const {
    userId,
    jobTitle,
    jobCity,
    jobDesc,
    uniName,
    startDate,
    endDate,
    degreeDesc
  } = req.body;
  try {
    let work = new Work({
      userId: userId,
      jobTitle: jobTitle,
      jobCity: jobCity,
      jobDesc: jobDesc,
      collegeName: uniName,
      startDate: startDate,
      endDate: endDate,
      degreeDesc: degreeDesc
    });
    let id_avail = await Work.findOne({ userId: work.userId });
    if (id_avail)
      await Work.updateMany(
        { userId: userId },
        {
          jobTitle: jobTitle,
          jobCity: jobCity,
          jobDesc: jobDesc,
          collegeName: uniName,
          startDate: startDate,
          endDate: endDate,
          degreeDesc: degreeDesc
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
