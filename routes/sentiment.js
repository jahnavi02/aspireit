// routes/sentiment.js
const express = require('express');
const { analyzeSentiment } = require('../controllers/sentimentController');
const router = express.Router();

router.post('/analyze', analyzeSentiment);

module.exports = router;
