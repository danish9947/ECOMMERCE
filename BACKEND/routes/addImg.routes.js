const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const ImgUpload = require('../models/Image');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Upload');
    },
    filename: (req, file, cb) => {
      cb(null,Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

  router.post('/upload', upload.single('image'), async (req, res) => {
    try {
      const baseUrl = `${req.protocol}://${req.get("host")}/api/image/`;
      const newImg = await ImgUpload.create({image:req.file.filename});
      const response = baseUrl+newImg.image;
      // console.log(response);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  });

router.get("/:imageName", (req, res) => {
    const img = req.params.imageName;
    const imgFolder = path.join(__dirname, "../Upload");
    const file = path.join(imgFolder, img)
    console.log(file);
    res.sendFile(file);
});

module.exports = router;
