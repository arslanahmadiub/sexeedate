const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  let id = mongoose.Types.ObjectId(req.body.userId);

  let gender = req.body.gender;
  try {
    const result = await Profile.aggregate([
      {
        $match: {
          $expr: {
            $and: [{ $ne: ["$_id", id] }, { $ne: ["$gender", gender] }],
          },
        },
      },

      {
        $project: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          dob: 1,
        },
      },

      {
        $lookup: {
          from: "BasicInfo",

          let: { profileId: { $toString: "$_id" } },

          pipeline: [
            { $match: { $expr: { $eq: ["$userId", "$$profileId"] } } },
            {
              $project: {
                _id: 0,
                userImages: 1,
                video: 1,
                bio: 1,
              },
            },
          ],

          as: "Detail",
        },
      },
      { $unwind: "$Detail" },
    ]);
    res.send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
