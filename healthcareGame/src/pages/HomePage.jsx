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

  const todayDate = new Date().toLocaleDateString("en-US");

  useEffect(() => {   //load saved data automatically
    const fetchUserData = async () => { 
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData) {   //update data
        setUserName(userData.userName);
        setLastLoginDate(userData.lastLoginDate || todayDate);

        if (userData.lastLoginDate !== todayDate) {
          await resetProgress();
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
  };

  const toggleMeditation = () => setMeditationDone((prev) => !prev); // update function and call back function
  const toggleWorkout = () => setWorkoutDone((prev) => !prev);

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

  return (
    <div className="home-page">
      <header className="hero-section">
        <h1>Welcome to Healthcare {userName}!</h1>
        <p>Complete your daily health challenges and grow your wellness.</p>

        <div className="main-container">
          <div className="water-tracker">
            <h2>Water Intake Challenge</h2>
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
            <p>
              {glasses.filter(Boolean).length}/8 glasses completed
              {glasses.filter(Boolean).length === 8 && (
                <span className="success-message">
                  {" "}
                  - Great job! You are hydrated and ready to take your day!
                </span>
              )}
            </p>
          </div>

          <div className="other-challenges">
            <h2>15-Minute Challenges</h2>
            <div
              className={`challenge meditation ${isMeditationDone ? "completed" : ""}`}
              onClick={toggleMeditation} // on and off event by toggle
            >
              <p>Meditation</p>
            </div>
            {isMeditationDone && (
              <p className="success-message">Amazing! Your mind is calm and focused</p>
            )}

            <div
              className={`challenge workout ${isWorkoutDone ? "completed" : ""}`}
              onClick={toggleWorkout}
            >
              <p>Workout</p>
            </div>
            {isWorkoutDone && (
              <p className="success-message" style={{ color: "#007bff" }}>
                Nice workout! 
              </p>
            )}
          </div>
        </div>

        <div className="highlighted-info">
          <span className="date">Today's Date: {todayDate}</span>
          <span className="points">Total Points Today: {totalPoints}</span>
          {totalPoints === 10 && (
            <p className="final-message"> Great job! You are made your day of body health very good.</p>
          )}
        </div>

        
      </header>

      <Footer />
    </div>
  );
};

export default HomePage;
