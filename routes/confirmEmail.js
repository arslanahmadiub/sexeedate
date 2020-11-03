const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const jwt = require('jsonwebtoken');


router.get("/", async (req, res) => {

    res.send("<h1>Conguratulation your account have been active...Go to main Page and login</h1>")
    let token = req.query.token;
    const header =await jwt.decode(token);
   let data= await Profile.findOneAndUpdate({_id:header._id},{active:true})

});
module.exports = router;