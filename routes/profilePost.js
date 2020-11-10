const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const config = require('config');
let nodeMailer = require('nodemailer');





async function mail( url,email) {


  let transport = nodeMailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    // secure:false,
   
    auth:{
        user:'arslanahmadiub@gmail.com',
        pass:"Iamalone007"
    }
  });

  let mailOptions={
    from:'arslanahmadiub@gmail.com',
    to: email,
    subject:"Verification Email",
    html:`For activate your account click on link below </br><a class="btn " href=${url}>
    Click Here
  </a>
    `
  }
  

  await transport.sendMail(mailOptions, function(error, info){
    if(error){
        console.warn(error);
    }else{
        console.warn("Message has been sent", info.response)
    }
    })
}






router.post("/", async (req, res) => {



  const { firstName, lastName, email, password, dob, gender } = req.body;
  try {
    let profile = new Profile({
      firstName,
      lastName,
      email,
      password,
      dob,
      gender,
    });
    let user = await Profile.findOne({ email: profile.email });
    if (user)return res.status(400).send("User of this email is already exist");

  

    const salt = await bcrypt.genSalt(10);
    profile.password = await bcrypt.hash(profile.password, salt);
    await profile.save();
    const token = jwt.sign({ _id: profile._id }, config.get("jwtPrivateKey"));
    res.send(profile);

    // here we send email for confirmuation
   let url= `http://157.230.228.67:5000/confirm?token=${token}`
    
   mail(url,email)



  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;
