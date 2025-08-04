import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HomePage.css";
import axios from "axios";

const HomePage = () => {
  const [glasses, setGlasses] = useState(() => {   // use state - store user data 
    return JSON.parse(localStorage.getItem("glasses")) || Array(8).fill(false);  // JSON get data from local storage converted as array from ls
  });
  const [isMeditationDone, setMeditationDone] = useState(() => {
    return JSON.parse(localStorage.getItem("isMeditationDone")) || false;
  });
  const [isWorkoutDone, setWorkoutDone] = useState(() => {
    return JSON.parse(localStorage.getItem("isWorkoutDone")) || false;
  });
  const [totalPoints, setTotalPoints] = useState(() => {
    return JSON.parse(localStorage.getItem("totalPoints")) || 0;
  });
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });
  const [lastLoginDate, setLastLoginDate] = useState(() => {
    return localStorage.getItem("lastLoginDate") || "";
  });
  const [showConfetti, setShowConfetti] = useState(false);

  const todayDate = new Date().toLocaleDateString("en-US");

  useEffect(() => {   //load saved data automatically
    const fetchUserData = async () => { 
      const userData = JSON.parse(localStorage.getItem("userData"));
      const savedLastLoginDate = localStorage.getItem("lastLoginDate");
      
      if (userData) {   //update data
        setUserName(userData.userName);
        
        // Check if we need to reset progress for a new day
        if (savedLastLoginDate !== todayDate) {
          console.log("New day detected, resetting progress...");
          await resetProgress();
          // Update the last login date to today
          localStorage.setItem("lastLoginDate", todayDate);
          setLastLoginDate(todayDate);
        } else {
          setLastLoginDate(savedLastLoginDate || todayDate);
        }
      }
    };

    fetchUserData(); // retrieve data from ls
  }, []);

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value)); //not already a string, convert to string
  };

  useEffect(() => {
    saveToLocalStorage("glasses", glasses);
    saveToLocalStorage("isMeditationDone", isMeditationDone);
    saveToLocalStorage("isWorkoutDone", isWorkoutDone);
    saveToLocalStorage("totalPoints", totalPoints);
    saveToLocalStorage("lastLoginDate", todayDate);
  }, [glasses, isMeditationDone, isWorkoutDone, totalPoints, todayDate]);

  const handleGlassClick = (index) => {
    const updatedGlasses = [...glasses]; // spread operator create new array with same elements
    updatedGlasses[index] = !updatedGlasses[index];
    setGlasses(updatedGlasses);
    
    // Add haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  const toggleMeditation = () => {
    setMeditationDone((prev) => !prev); // update function and call back function
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };
  
  const toggleWorkout = () => {
    setWorkoutDone((prev) => !prev);
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const resetProgress = async () => {
    try {
      const response = await axios.post("http://localhost:3001/reset-progress", {
        userId: localStorage.getItem("userId"),
      });

      const user = response.data.user;

      setGlasses(user.glasses);
      setMeditationDone(user.isMeditationDone);
      setWorkoutDone(user.isWorkoutDone);
      setTotalPoints(user.totalPoints);
      setLastLoginDate(user.lastLoginDate);
    } catch (error) {
      console.error("Error resetting progress:", error);
    }
  };

  const updateTotalPoints = () => {
    const points =
      glasses.filter(Boolean).length + (isMeditationDone ? 1 : 0) + (isWorkoutDone ? 1 : 0);
    setTotalPoints(points);

    // Show confetti when reaching max points
    if (points === 10 && !showConfetti) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    axios.post("http://localhost:3001/update-progress", {// axios: data send & recieve from backend
      userId: localStorage.getItem("userId"),
      glasses,
      isMeditationDone,
      isWorkoutDone,
      totalPoints: points,
    }).catch((error) => console.error("Error updating progress:", error));
  };

  useEffect(() => {
    updateTotalPoints();
  }, [glasses, isMeditationDone, isWorkoutDone]);

  const navigateToAnotherPage = () => { // Save all necessary data before navigating
    saveToLocalStorage("glasses", glasses);
    saveToLocalStorage("isMeditationDone", isMeditationDone);
    saveToLocalStorage("isWorkoutDone", isWorkoutDone);
    saveToLocalStorage("totalPoints", totalPoints);
    saveToLocalStorage("lastLoginDate", todayDate);

    // Redirect to another page while keeping session data
    window.location.assign("/home"); // Change to the actual route
  };

  const calculateProgress = () => {
    return (totalPoints / 10) * 100;
  };

  const getMotivationalMessage = () => {
    const completed = glasses.filter(Boolean).length;
    if (completed === 0) return "Let's start your healthcare journey! 💧";
    if (completed <= 3) return "Great start! Your health matters! 🌟";
    if (completed <= 6) return "You're doing amazing! Stay healthy! 🎯";
    if (completed === 8) return "Perfect! You're fully hydrated and healthy! 🎉";
    return "You're a healthcare champion! 🏆";
  };

  return (
    <div className="home-page">
      {showConfetti && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 3 + 's',
                backgroundColor: ['#667eea', '#764ba2', '#f093fb', '#28a745', '#ffc107'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}
      
      <header className="hero-section">
        <h1>🏥 Welcome to Healthcare {userName}! 🏥</h1>
        <p>Complete your daily health challenges and grow your wellness journey.</p>
        
        <div className="healthcare-icons">
          <span className="health-icon">💊</span>
          <span className="health-icon">🏥</span>
          <span className="health-icon">💉</span>
          <span className="health-icon">🩺</span>
          <span className="health-icon">⚕️</span>
        </div>

        <div className="main-container">
          <div className="water-tracker">
            <div className="tracker-header">
              <img src="/water-drop.svg" alt="Water Drop" className="tracker-icon" />
              <h2>💧 Daily Hydration Challenge</h2>
            </div>
            <p className="motivational-text">{getMotivationalMessage()}</p>
            
            <div className="glasses-container">
              {glasses.map((isDrunk, index) => ( // loop
                <div
                  key={index}
                  className={`glass ${isDrunk ? "filled" : ""}`}  // tentary operator
                  onClick={() => handleGlassClick(index)}
                >
                  <div className="water"></div>
                  <span className="glass-number">{index + 1}</span>
                </div>
              ))}
            </div>
            
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${(glasses.filter(Boolean).length / 8) * 100}%` }}
              ></div>
            </div>
            
            <p>
              {glasses.filter(Boolean).length}/8 glasses completed
              {glasses.filter(Boolean).length === 8 && (
                <span className="success-message">
                  {" "}
                  - Great job! You are healthy and ready to take on your day! 🏥
                </span>
              )}
            </p>
          </div>

          <div className="other-challenges">
            <div className="challenges-header">
              <img src="/healthcare-icon.svg" alt="Healthcare" className="challenges-icon" />
              <h2>🏥 Wellness Challenges</h2>
            </div>
            <div
              className={`challenge meditation ${isMeditationDone ? "completed" : ""}`}
              onClick={toggleMeditation} // on and off event by toggle
            >
              <p>🧘 Mental Wellness</p>
            </div>
            {isMeditationDone && (
              <p className="success-message">Amazing! Your mental health is thriving! 🧠</p>
            )}

            <div
              className={`challenge workout ${isWorkoutDone ? "completed" : ""}`}
              onClick={toggleWorkout}
            >
              <p>💪 Physical Exercise</p>
            </div>
            {isWorkoutDone && (
              <p className="success-message" style={{ color: "#4CAF50" }}>
                Excellent! Your body is getting stronger! 💪
              </p>
            )}
          </div>
        </div>

        <div className="highlighted-info">
          <span className="date">Today's Date: {todayDate}</span>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
          <span className="points">Total Points Today: {totalPoints}/10</span>
          {totalPoints === 10 && (
            <p className="final-message">🎉 Excellent! You've achieved perfect health goals for today! 🏥</p>
          )}
        </div>

        
      </header>

      <Footer />
    </div>
  );
};

export default HomePage;
