import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GamePage.css";

const GamePage = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState(null);

  // 20 quiz topics with descriptions
  const quizTopics = [
    { id: 1, name: "Nutrition Basics", description: "Learn about essential nutrients and healthy eating habits", icon: "🥗" },
    { id: 2, name: "Mental Health", description: "Understanding mental wellness and stress management", icon: "🧠" },
    { id: 3, name: "Physical Fitness", description: "Exercise fundamentals and workout routines", icon: "💪" },
    { id: 4, name: "Sleep Hygiene", description: "Importance of quality sleep and sleep disorders", icon: "😴" },
    { id: 5, name: "Cardiovascular Health", description: "Heart health, blood pressure, and circulation", icon: "❤️" },
    { id: 6, name: "Respiratory System", description: "Lung health and breathing techniques", icon: "🫁" },
    { id: 7, name: "Digestive Health", description: "Gut health and digestive disorders", icon: "🩺" },
    { id: 8, name: "Immune System", description: "How to boost immunity and prevent diseases", icon: "🛡️" },
    { id: 9, name: "Bone Health", description: "Osteoporosis prevention and bone strengthening", icon: "🦴" },
    { id: 10, name: "Eye Care", description: "Vision health and eye protection", icon: "👁️" },
    { id: 11, name: "Dental Health", description: "Oral hygiene and dental care", icon: "🦷" },
    { id: 12, name: "Skin Care", description: "Skin health and dermatological conditions", icon: "🧴" },
    { id: 13, name: "Women's Health", description: "Female-specific health concerns and wellness", icon: "👩" },
    { id: 14, name: "Men's Health", description: "Male-specific health concerns and wellness", icon: "👨" },
    { id: 15, name: "Child Health", description: "Pediatric health and child development", icon: "👶" },
    { id: 16, name: "Senior Health", description: "Aging health concerns and geriatric care", icon: "👴" },
    { id: 17, name: "First Aid", description: "Emergency care and basic medical procedures", icon: "🚑" },
    { id: 18, name: "Medication Safety", description: "Proper medication use and drug interactions", icon: "💊" },
    { id: 19, name: "Environmental Health", description: "How environment affects our health", icon: "🌍" },
    { id: 20, name: "Preventive Care", description: "Disease prevention and health screenings", icon: "🏥" }
  ];

  const handleTopicClick = (topic) => {
    navigate(`/quiz/${encodeURIComponent(topic.name)}`);
  };

  const handleBackToHome = () => {
    navigate("/home");
  };

  const handleScore = () => {
    navigate("/score");
  };

  return (
    <div className="game-page">
      <div className="game-header">
        <h1>🏥 Health Quiz Topics</h1>
        <p>Select a topic to learn more about health and wellness</p>
      </div>

      <div className="topics-grid">
        {quizTopics.map((topic) => (
          <div
            key={topic.id}
            className={`topic-card ${selectedTopic?.id === topic.id ? 'selected' : ''}`}
            onClick={() => handleTopicClick(topic)}
          >
            <div className="topic-icon">{topic.icon}</div>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <div className="topic-info">
              <span className="questions-count">20 Questions</span>
              <span className="difficulty">Beginner</span>
            </div>
          </div>
        ))}
      </div>

      {selectedTopic && (
        <div className="selected-topic-info">
          <h2>Selected: {selectedTopic.name}</h2>
          <p>{selectedTopic.description}</p>
          <p className="topic-note">This topic contains 20 comprehensive questions about {selectedTopic.name.toLowerCase()}.</p>
        </div>
      )}

      <div className="game-actions">
        <button onClick={handleBackToHome} className="back-home-button">
          <span className="button-icon">🏠</span>
          <span>Go Back Home</span>
        </button>
        <button onClick={handleScore} className="score-button">
          <span className="button-icon">📊</span>
          <span>View Score</span>
        </button>
      </div>
    </div>
  );
};

export default GamePage;