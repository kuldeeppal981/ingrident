const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { handleOCR } = require('../controllers/ocrController');

// Configure Multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });


router.post('/upload', upload.single('image'), handleOCR);

module.exports = router;
