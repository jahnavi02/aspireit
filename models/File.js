//importing required modules
const mongoose = require('mongoose');

//creating the file storage schema

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  contentType: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('File', fileSchema);
