const mongoose = require("mongoose");

// User Schema definition
const userSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: true, 
    unique: true,  // Ensure that the username is unique
    trim: true     // Trim any extra spaces from the username
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,  // Ensure the email is unique
    lowercase: true, // Email should be in lowercase
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please provide a valid email address"] // Email validation regex
  },
  password: { 
    type: String, 
    required: true, 
    minlength: [6, "Password must be at least 6 characters long"]  // Password validation
  },
  glasses: { 
    type: [Boolean], 
    required: true, 
    validate: {
      validator: function(value) {
        return value.length === 8; // Ensure 8 glasses are being tracked
      },
      message: "There should be exactly 8 glasses to track."
    }
  },
  isMeditationDone: { 
    type: Boolean, 
    required: true 
  },
  isWorkoutDone: { 
    type: Boolean, 
    required: true 
  },
  totalPoints: { 
    type: Number, 
    required: true, 
    min: [0, "Total points cannot be negative"],  // Ensure points are non-negative
    max: [10, "Total points cannot exceed 10"],  // Maximum points of 10
  },
  lastLoginDate: { 
    type: String, 
    required: true, 
    match: [/\d{1,2}\/\d{1,2}\/\d{4}/, "Please provide a valid date format (MM/DD/YYYY)"] // Ensure valid date format
  },
}, { timestamps: true }); // Automatically add `createdAt` and `updatedAt` fields

// Create the model for the user schema
const User = mongoose.model("User", userSchema);

module.exports = User;
