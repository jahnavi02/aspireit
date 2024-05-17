//importing required modules
const path = require('path');
const multer = require('multer');
const File = require('../models/File');

//multer logic

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf|mp4|mp3/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Invalid file type'));
  }
});

exports.uploadMiddleware = upload.single('file');

//uploading the file controller

exports.uploadFile = async (req, res) => {
  try {
    const newFile = new File({
      filename: req.file.originalname,
      data: req.file.buffer,
      contentType: req.file.mimetype,
      user: req.user._id
    });
    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: 'File upload failed' });
  }
};
