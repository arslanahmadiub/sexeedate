const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Profile = require("../models/Profile");


router.post("/", async (req, res) => {
    let data = req.body;
    var id = mongoose.Types.ObjectId(data.userId);
    
    try {
   
      const result = await Profile.aggregate([
     

        { "$match": {_id :id}},
        { $project : { firstName : 1, lastName : 1 , gender:1} },
       


        { 
            $addFields: { "_id": { "$toString": "$_id" } }
          },
        {
          $lookup:
            {
              from: "BasicInfo",
              localField: "_id",
              foreignField: "userId",
              as: "User", 
            },
           
            
       },
      
       { $unwind : "$User" }
      
     ]);
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  });
  module.exports = router;