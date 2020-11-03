const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const Post = require("../models/Post")



router.post("/", async (req, res) => {
   
  const ObjectId = mongoose.Types.ObjectId;

    try {
   
      const result = await Post.aggregate([
        { $project : { dateTime : 1, message : 1, userId:1 } },
        { $sort : { _id : -1 } },

        {
          $lookup:
            {
              from: "BasicInfo",
              let: { profileId: { "$toString": "$userId" }},
             
              "pipeline": [
                { "$match": { "$expr": { "$eq": ["$userId", "$$profileId"] }}},
                { "$project": { "_id": 0, "userImages": { $arrayElemAt: [ "$userImages", 0 ] } }}
              ],
  
              as: "UserImage"
            }
       },
       { $unwind : "$UserImage" },
       { $unset:   "Name" },
          {
          $lookup:
            {
              from: "Profile",
              
              let: { profileId: { "$toObjectId": "$userId" }},
             
              "pipeline": [
                { "$match": { "$expr": { "$eq": ["$_id", "$$profileId"] }}},
                {
                  "$project": {
                    "_id": 0,
                  
                    fullName:{$concat: [ "$firstName", " ", "$lastName" ]},
                 
                  },
                
                },
      
              ],
  
              as: "Name"
            }
       },
       { $unwind : "$Name" },
  
      
     ]);
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  });
  module.exports = router;