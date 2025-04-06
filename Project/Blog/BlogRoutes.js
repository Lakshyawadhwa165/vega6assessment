const express = require('express');
const router = express.Router();
const blogController = require('../Blog/Blog'); // Adjust path as needed
const auth = require('../../Middleware/Auth');
const multer = require('multer');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Blog Routes
router.post('/blogs', auth, upload.single('blogImage'), blogController.addBlog);
router.get('/blogs', blogController.getBlogs);
router.get('/blogs/:id', blogController.getBlogById);
router.put('/blogs/:id', auth, upload.single('blogImage'), blogController.updateBlog);
router.delete('/blogs/:id', auth, blogController.deleteBlog);

module.exports = router;
