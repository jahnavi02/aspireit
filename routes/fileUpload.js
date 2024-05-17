// routes/fileUpload.js
const express = require('express');
const { uploadMiddleware, uploadFile } = require('../controllers/fileController');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

router.post('/upload', ensureAuth, uploadMiddleware, uploadFile);

module.exports = router;
