//importing required modules
const express = require('express');
const { analyzeSentiment } = require('../controllers/sentimentController');
const router = express.Router();

//utilising the imported controllers for routers

router.post('/analyze', analyzeSentiment);

module.exports = router;
