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
const QuizPoints = require('./models/QuizePoints')
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
