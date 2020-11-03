const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Profile = require("../models/Profile");

router.get("/", async (req, res) => {
  try {
    const result = await Profile.aggregate([
      { $match: { $expr: { $or :[ {$eq:[ "$status","Partial"]},{$eq:[ "$status","Disable"]}    ] } } },
      
      {
        $project: {
          fullName: { $concat: ["$firstName", " ", "$lastName"] },
          email: 1,
          gender: 1,
          status:1
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
                pasport: 1,
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
