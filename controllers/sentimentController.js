//importing required modules
const vader = require('vader-sentiment');

//analysing sentiment controller

exports.analyzeSentiment = (req, res) => {
  const text = req.body.text;
  if (!text) {
    return res.status(400).json({ message: 'Text is required' });
  }
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  let sentiment;
  if (intensity.compound >= 0.05) {
    sentiment = 'positive';
  } else if (intensity.compound <= -0.05) {
    sentiment = 'negative';
  } else {
    sentiment = 'neutral';
  }
  res.json({ sentiment, intensity });
};
