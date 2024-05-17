//importing required modules
const express = require('express');
const { uploadMiddleware, uploadFile } = require('../controllers/fileController');
const { ensureAuth } = require('../middleware/auth');
const router = express.Router();

//utilising the imported controllers for routers

router.post('/upload', ensureAuth, uploadMiddleware, uploadFile);

module.exports = router;
