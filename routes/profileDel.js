const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const BasicInfo = require("../models/BasicInfo");
const Post = require("../models/Post");
const Contact = require("../models/Contact");
const Covid = require("../models/Covid");
const Work = require("../models/Work");
const Hobby = require("../models/Hobby");
const fs = require("fs");

router.post(
  "/",

  async (req, res) => {
    const profileId = req.body.id;
    try {
      let result = await BasicInfo.find({ userId: profileId }, function (err) {
        if (err) console.log(err);
      });
      res.send(result);
      // video Delete section
      if (result.length > 0) {
        let video = result[0].video;
        let videoUrl = video.image_url.slice(33);
        //  deleteFile(videoUrl)

        // imageDeletSection

        let images = result[0].userImages;

        for (let i = 0; i < 3; i++) {
          deleteFile(images[i].imageUrl.slice(33));
        }

        // pasport deleteSection

        let pasport = result[0].pasport;
        deleteFile(pasport.image_url.slice(33));

        // delete basicInfo

        await BasicInfo.deleteMany({ userId: profileId });
      }

      // delete profile info

      await Profile.deleteMany({ _id: profileId });

      // delete post info

      await Post.deleteMany({ userId: profileId });

      // delete Contact info

      await Contact.deleteMany({ userId: profileId });

      // delete covid info

      await Covid.deleteMany({ userId: profileId });

      // delete work info

      await Work.deleteMany({ userId: profileId });

      // delete Hobby info

      await Hobby.deleteMany({ userId: profileId });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error...");
    }
  }
);

module.exports = router;

let deleteFile = (data) => {
  try {
    fs.unlinkSync(`upload/images/${data}`);

    console.log("Image Delete");
  } catch (e) {
    console.log("Error deleting image!");
  }
};
