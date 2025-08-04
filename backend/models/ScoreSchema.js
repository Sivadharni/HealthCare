const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  totalQuestions: {
    type: Number,
    required: true,
    default: 20
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  grade: {
    type: String,
    required: true,
    enum: ['A+', 'A', 'B', 'C', 'D', 'F']
  },
  date: {
    type: Date,
    default: Date.now
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  correctAnswers: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  },
  incorrectAnswers: {
    type: Number,
    required: true,
    min: 0,
    max: 20
  }
}, {
  timestamps: true
});

// Create compound index for username and topic to prevent duplicate entries
scoreSchema.index({ username: 1, topic: 1 }, { unique: true });

// Pre-save middleware to calculate percentage and grade
scoreSchema.pre('save', function(next) {
  // Calculate percentage
  this.percentage = Math.round((this.score / this.totalQuestions) * 100);
  
  // Calculate grade based on percentage
  if (this.percentage >= 90) {
    this.grade = 'A+';
  } else if (this.percentage >= 80) {
    this.grade = 'A';
  } else if (this.percentage >= 70) {
    this.grade = 'B';
  } else if (this.percentage >= 60) {
    this.grade = 'C';
  } else if (this.percentage >= 50) {
    this.grade = 'D';
  } else {
    this.grade = 'F';
  }
  
  // Calculate correct and incorrect answers
  this.correctAnswers = this.score;
  this.incorrectAnswers = this.totalQuestions - this.score;
  
  next();
});

module.exports = mongoose.model('Score', scoreSchema); 