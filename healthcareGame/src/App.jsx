import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GamePage from "./pages/GamePage";
import QuizPage from "./pages/QuizPage";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import Navbar1 from "./components/Navbar1";

const App = () => {
  const [userDetails, setUserDetails] = useState(() => {
    // Load user details from localStorage if available
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  useEffect(() => {
    // Save user details to localStorage when they change
    localStorage.setItem("user", JSON.stringify(userDetails));
  }, [userDetails]);

  const isLoggedIn = userDetails && userDetails.username;

  return (
    <div className="background">
      <Router>
       
        <Routes>
          {/* <Route 
            path="/" 
            element={
              isLoggedIn ? (
                <HomePage userDetails={userDetails} />
              ) : (
                <LoginPage setUserDetails={setUserDetails} />
              )
            } 
          /> */}
          <Route path="/home" element={<><Navbar /><HomePage userDetails={userDetails} /></>} />
          <Route path="/game" element={<><Navbar /><GamePage /></>} />
          <Route path="/quiz" element={<><Navbar /><QuizPage /></>} />
          <Route path="/about" element={<><Navbar /><AboutUs /></>} />
          <Route path="/" element={<><Navbar1/><Login /></>} />
          <Route path="/Signup" element={<><Navbar1 /><Signup /></>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;