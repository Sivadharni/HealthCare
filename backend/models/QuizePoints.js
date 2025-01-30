const mongoose = require('mongoose');

const quizPointsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  topic: { type: String, required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const QuizPoints = mongoose.model('QuizPoints', quizPointsSchema);

module.exports = QuizPoints;
