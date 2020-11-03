const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Profile = require("../models/Profile");

router.post("/", async (req, res) => {
  const userId = mongoose.Types.ObjectId(req.body.userId);

  try {
    const result = await Profile.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$_id", userId],
          },
        },
      },
      {
        $project: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          firstName: 1,
          role: 1,
          dob: 1,
          gender: 1,
          email: 1,
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
                userImages:  { $arrayElemAt: [ "$userImages", 0 ] },
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
