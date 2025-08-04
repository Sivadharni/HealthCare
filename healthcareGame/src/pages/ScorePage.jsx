import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ScorePage.css";

const ScorePage = () => {
  const navigate = useNavigate();
  const [userScores, setUserScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load scores from backend API
  useEffect(() => {
    const fetchScores = async () => {
      try {
        const username = localStorage.getItem("userName") || "demo_user";
        const response = await fetch(`http://localhost:3001/getScores/${username}`);
        
        if (response.ok) {
          const data = await response.json();
          // Transform the data to match our component structure
          const transformedScores = data.scores.map((score, index) => ({
            id: index + 1,
            topic: score.topic,
            score: score.score,
            totalQuestions: score.totalQuestions,
            date: new Date(score.date).toLocaleDateString("en-US"),
            percentage: score.percentage,
            grade: score.grade
          }));
          setUserScores(transformedScores);
        } else {
          console.error('Failed to fetch scores');
          // Fallback to mock data if API fails
          const mockScores = [
            { id: 1, topic: "Nutrition Basics", score: 85, totalQuestions: 20, date: "2024-01-15", percentage: 85, grade: "A" },
            { id: 2, topic: "Mental Health", score: 92, totalQuestions: 20, date: "2024-01-14", percentage: 92, grade: "A+" },
            { id: 3, topic: "Physical Fitness", score: 78, totalQuestions: 20, date: "2024-01-13", percentage: 78, grade: "B" },
            { id: 4, topic: "Sleep Hygiene", score: 88, totalQuestions: 20, date: "2024-01-12", percentage: 88, grade: "A" },
            { id: 5, topic: "Cardiovascular Health", score: 95, totalQuestions: 20, date: "2024-01-11", percentage: 95, grade: "A+" }
          ];
          setUserScores(mockScores);
        }
      } catch (error) {
        console.error('Error fetching scores:', error);
        // Fallback to mock data
        const mockScores = [
          { id: 1, topic: "Nutrition Basics", score: 85, totalQuestions: 20, date: "2024-01-15", percentage: 85, grade: "A" },
          { id: 2, topic: "Mental Health", score: 92, totalQuestions: 20, date: "2024-01-14", percentage: 92, grade: "A+" },
          { id: 3, topic: "Physical Fitness", score: 78, totalQuestions: 20, date: "2024-01-13", percentage: 78, grade: "B" },
          { id: 4, topic: "Sleep Hygiene", score: 88, totalQuestions: 20, date: "2024-01-12", percentage: 88, grade: "A" },
          { id: 5, topic: "Cardiovascular Health", score: 95, totalQuestions: 20, date: "2024-01-11", percentage: 95, grade: "A+" }
        ];
        setUserScores(mockScores);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const handleBackToGame = () => {
    navigate("/game");
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return "#4CAF50"; // Green
    if (percentage >= 80) return "#FF9800"; // Orange
    if (percentage >= 70) return "#2196F3"; // Blue
    return "#F44336"; // Red
  };

  const getScoreGrade = (percentage) => {
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    return "D";
  };

  const calculateAverageScore = () => {
    if (userScores.length === 0) return 0;
    const total = userScores.reduce((sum, score) => sum + score.score, 0);
    return Math.round(total / userScores.length);
  };

  const averageScore = calculateAverageScore();

  if (loading) {
    return (
      <div className="score-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your scores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="score-page">
      <div className="score-header">
        <h1>📊 Your Health Quiz Scores</h1>
        <p>Track your progress across all health topics</p>
      </div>

      <div className="score-summary">
        <div className="summary-card">
          <div className="summary-icon">🎯</div>
          <h3>Average Score</h3>
          <div className="average-score">{averageScore}%</div>
          <p>Overall Performance</p>
        </div>
        <div className="summary-card">
          <div className="summary-icon">📚</div>
          <h3>Topics Completed</h3>
          <div className="topics-count">{userScores.length}</div>
          <p>Out of 20 Topics</p>
        </div>
        <div className="summary-card">
          <div className="summary-icon">🏆</div>
          <h3>Best Score</h3>
          <div className="best-score">
            {Math.max(...userScores.map(s => s.score))}%
          </div>
          <p>Cardiovascular Health</p>
        </div>
      </div>

      <div className="scores-container">
        <h2>Detailed Scores</h2>
        <div className="scores-grid">
          {userScores.map((score) => {
            const percentage = score.percentage || (score.score / score.totalQuestions) * 100;
            const scoreColor = getScoreColor(percentage);
            const grade = score.grade || getScoreGrade(percentage);
            
            return (
              <div key={score.id} className="score-card">
                <div className="score-header">
                  <h3>{score.topic}</h3>
                  <div className="score-badge" style={{ backgroundColor: scoreColor }}>
                    {grade}
                  </div>
                </div>
                <div className="score-details">
                  <div className="score-percentage" style={{ color: scoreColor }}>
                    {score.score}/{score.totalQuestions} ({Math.round(percentage)}%)
                  </div>
                  <div className="score-date">{score.date}</div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${percentage}%`, 
                      backgroundColor: scoreColor 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="score-actions">
        <button onClick={handleBackToGame} className="back-game-button">
          <span className="button-icon">🎮</span>
          <span>Back to Game</span>
        </button>
        <button onClick={handleBackToHome} className="back-home-button">
          <span className="button-icon">🏠</span>
          <span>Go Back Home</span>
        </button>
      </div>
    </div>
  );
};

export default ScorePage; 