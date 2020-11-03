const express = require("express");

const router = express.Router();
const Covid = require("../models/Covid");



router.post("/", async (req, res) => {
    let data = req.body;
    
    try {
      const result = await Covid.findOne( {userId:data.userId});
      res.send(result);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error!");
    }
  });
  module.exports = router;