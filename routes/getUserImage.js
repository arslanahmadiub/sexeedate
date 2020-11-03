const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const BasicInfo = require("../models/BasicInfo");

router.post("/", async (req, res) => {
  const userId = req.body.userId;

  try {
    const result = await BasicInfo.aggregate([
      {
        $match: {
          $expr: {
            $eq: ["$userId", userId],
          },
        },
      },
      {
        $project: {
            userImages:  { $arrayElemAt: [ "$userImages", 0 ] },
        },
      },
    

    ]);
    res.send(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});
module.exports = router;
