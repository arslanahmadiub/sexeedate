const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("config");
let nodeMailer = require("nodemailer");

router.post("/", async (req, res) => {
  let userId = req.body.userId;
  try {
    let user = await Profile.findOne({ _id: userId });
    if (user && user.role =="Admin")
       res.send(user);
    else{
        res.send(null)
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
