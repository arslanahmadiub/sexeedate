const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("config");
let nodeMailer = require("nodemailer");

async function mail(url, email) {
  let transport = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    // secure:false,

    auth: {
      user: "arslanahmadiub@gmail.com",
      pass: "Iamalone007",
    },
  });

  let mailOptions = {
    from: "arslanahmadiub@gmail.com",
    to: email,
    subject: "Reset password",
    html: `For reset your password click on link below </br><a class="btn " href=${url}>
    Click Here
  </a>
    `,
  };

  await transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.warn(error);
    } else {
      console.warn("Message has been sent", info.response);
    }
  });
}

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    let user = await Profile.findOne({ email });
    if (!user) {
      return res.status(400).send("User of this email is not exist");
    } else {
      const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
      let url = `http://157.230.228.67/#/forgot?token=${token}`;
      mail(url, email);
      res.send(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
