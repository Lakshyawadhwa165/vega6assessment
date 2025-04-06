const express = require('express');
const router = express.Router();

const authController = require('../Login/Login.js');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });



router.post('/register', upload.single('profileImage'), authController.register);
router.post('/login', authController.login);

module.exports = router;