const express = require("express");

const router = express.Router();
const basicInfo = require("../models/BasicInfo");

router.post("/", async (req, res) => {
  const { userId, languages, pasport, userImages, video, bio } = req.body;
  try {
    let basicinfo = new basicInfo({
      userId: userId,
      languages: languages,
      pasport: pasport,
      userImages: userImages,
      video: video,
      bio:bio
    });
    // let id_avail = await basicInfo.findOne({ userId: basicinfo.userId });
    // if (id_avail)
    //   return res.status(400).send("Choose an other ID, this one already exist");

    await basicinfo.save();
    res.send(basicinfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
