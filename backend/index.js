const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Signup = require('./models/SignupSchema');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const User = require('./models/userSchema');
const QuizPoints = require('./models/QuizePoints');
const Score = require('./models/ScoreSchema');
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB Connection Successful");
    })
    .catch((err) => {
        console.error("MongoDB Connection Unsuccessful:", err.message);
    });

app.get('/', (req, res) => {
    res.send(`Welcome to the backend!`);
});

app.post('/signup', async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Hashed password for user ${userName}:`, hashedPassword);  // Debugging: Log hashed password

        const newSignup = new Signup({
            firstName,
            lastName,
            userName,
            email,
            password: hashedPassword,
        });
 
        await newSignup.save();
        res.status(201).send("SignUp Successful");
    } catch (err) {
        res.status(400).send({ message: "SignUp Unsuccessful", error: err.message });
    }
});

app.post('/login', async (req, res) => {
    const { userName, password } = req.body;

    // Check if userName or password is missing
    if (!userName || !password) {
        return res.status(400).json({ success: false, message: "Missing username or password" });
    }

    try {
        // Perform case-insensitive search for the username
        const user = await Signup.findOne({ userName: userName.toLowerCase() });

        console.log("User found:", user ? user.userName : "No user found");  // Debugging: Log user search result

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Compare the password entered with the hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        console.log(`Password match status for user ${userName}:`, isMatch);  // Debugging: Log match status

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        res.status(200).json({ success: true, message: "Login Successful" });
    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ success: false, message: "Server Error", error: err.message });
    }
});

app.post('/savePoints', async (req, res) => {
    const { username, topic, points } = req.body;
  
    try {
      const newQuizPoints = new QuizPoints({ username, topic, points });
      await newQuizPoints.save();
      res.status(201).json({ message: 'Points saved successfully' });
    } catch (error) {
      console.error('Error saving points:', error); // Log the error details
      res.status(500).json({ error: 'Error saving points' });
    }
  });

// Save quiz score
app.post('/saveScore', async (req, res) => {
  const { username, topic, score, totalQuestions = 20, timeSpent = 0 } = req.body;
  
  try {
    // Check if score already exists for this user and topic
    const existingScore = await Score.findOne({ username, topic });
    
    if (existingScore) {
      // Update existing score if new score is higher
      if (score > existingScore.score) {
        existingScore.score = score;
        existingScore.totalQuestions = totalQuestions;
        existingScore.timeSpent = timeSpent;
        await existingScore.save();
        res.status(200).json({ message: 'Score updated successfully', score: existingScore });
      } else {
        res.status(200).json({ message: 'Score already exists and is higher', score: existingScore });
      }
    } else {
      // Create new score
      const newScore = new Score({ username, topic, score, totalQuestions, timeSpent });
      await newScore.save();
      res.status(201).json({ message: 'Score saved successfully', score: newScore });
    }
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ error: 'Error saving score' });
  }
});

// Get user scores
app.get('/getScores/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const scores = await Score.find({ username }).sort({ date: -1 });
    res.status(200).json({ scores });
  } catch (error) {
    console.error('Error fetching scores:', error);
    res.status(500).json({ error: 'Error fetching scores' });
  }
});

// Get user score statistics
app.get('/getScoreStats/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const scores = await Score.find({ username });
    
    if (scores.length === 0) {
      return res.status(200).json({ 
        averageScore: 0, 
        totalTopics: 0, 
        bestScore: 0, 
        bestTopic: null 
      });
    }
    
    const totalScore = scores.reduce((sum, score) => sum + score.score, 0);
    const averageScore = Math.round(totalScore / scores.length);
    const bestScore = Math.max(...scores.map(s => s.score));
    const bestTopic = scores.find(s => s.score === bestScore)?.topic;
    
    res.status(200).json({
      averageScore,
      totalTopics: scores.length,
      bestScore,
      bestTopic
    });
  } catch (error) {
    console.error('Error fetching score stats:', error);
    res.status(500).json({ error: 'Error fetching score statistics' });
  }
});
  app.post("/update-progress", async (req, res) => {
    const { userId, glasses, isMeditationDone, isWorkoutDone, totalPoints } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user progress
      user.glasses = glasses;
      user.isMeditationDone = isMeditationDone;
      user.isWorkoutDone = isWorkoutDone;
      user.totalPoints = totalPoints;
  
      await user.save();
      res.status(200).json({ message: "User progress updated successfully", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
  

app.listen(3001, () => {
    console.log("Server Started on Port 3001");
});
