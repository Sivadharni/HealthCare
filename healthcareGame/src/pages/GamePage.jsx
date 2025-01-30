import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GamePage.css";

const GamePage = () => {
  const navigate = useNavigate();

  const handlePlayQuiz = () => {
    navigate("/quiz"); // Navigating to QuizPage when button is clicked
  };

  const handleBackToHome = () => {
    navigate("/home"); // Navigating back to HomePage when button is clicked
  };


  return (
    <div className="game-page">
      <h1>Welcome to the Health Quiz Game</h1>
      <p>Test your knowledge on health and wellness</p>
      <button onClick={handlePlayQuiz} className="play-quiz-button">
        Play Quiz
      </button>
      <button onClick={handleBackToHome} className="back-home-button">
        Back to Home
      </button>
    </div>
  );
};

export default GamePage;