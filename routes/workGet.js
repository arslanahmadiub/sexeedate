const express = require("express");

const router = express.Router();
const Work = require("../models/Work");


router.get("/", async (req, res) => {
    let data = req.body;
    
    try {
      // const result = await Work.findOne( {userId:data.userId});
      // const result = await Work.find().populate({ path: 'userId', model: Profile });
      const result = await Work.aggregate([
        { "$match": {userId :{$ne:data.userId }}},
        {
          $lookup:
            {
              from: "Place",
              localField: "userId",
              foreignField: "userId",
              as: "User"
            }
       },

      
     ]);
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  });
  module.exports = router;