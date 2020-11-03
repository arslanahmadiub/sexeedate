const multer = require("multer");
const express = require("express");
const router = express.Router();
const path = require("path");
const config = require('config');
const imageUrl = config.get('imageUrl');
// Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, callBack) => {
    return callBack(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});


try {
  router.post("/", upload.array("images",5), async (req, res) => {
    
    let fileName = req.files;
    let responce =[
      {
        imageUrl:`${imageUrl}${fileName[0].filename}`
      },
      {
        imageUrl:`${imageUrl}${fileName[1].filename}`
      },
      {
        imageUrl:`${imageUrl}${fileName[2].filename}`
      }
    ]
    
    res.send(responce)
    
  });
} catch (err) {
  console.error(err.message);
  res.status(500).send("Server Error...");
}


module.exports = router;
