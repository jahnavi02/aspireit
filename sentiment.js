// sentiment.js
const vader = require('vader-sentiment');

module.exports = function analyzeSentiment(text) {
  const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
  if (intensity.compound >= 0.05) return 'positive';
  if (intensity.compound <= -0.05) return 'negative';
  return 'neutral';
};
