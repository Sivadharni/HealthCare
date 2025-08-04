import React, { useState } from "react";
import "../styles/HealthcarePage.css";

const HealthcarePage = () => {
  const [activeTip, setActiveTip] = useState(0);

  const healthcareTips = [
    {
      id: 1,
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily to maintain good health and energy levels.",
      image: "💧",
      category: "Hydration",
      benefits: ["Improves skin health", "Boosts energy", "Aids digestion", "Regulates body temperature"]
    },
    {
      id: 2,
      title: "Regular Exercise",
      description: "Aim for at least 30 minutes of moderate exercise daily to keep your body strong and healthy.",
      image: "🏃‍♂️",
      category: "Fitness",
      benefits: ["Strengthens heart", "Improves mood", "Increases energy", "Better sleep"]
    },
    {
      id: 3,
      title: "Balanced Nutrition",
      description: "Eat a variety of fruits, vegetables, lean proteins, and whole grains for optimal health.",
      image: "🥗",
      category: "Nutrition",
      benefits: ["Provides essential nutrients", "Maintains weight", "Boosts immunity", "Improves focus"]
    },
    {
      id: 4,
      title: "Quality Sleep",
      description: "Get 7-9 hours of quality sleep each night to allow your body to rest and recover.",
      image: "😴",
      category: "Sleep",
      benefits: ["Improves memory", "Reduces stress", "Boosts immunity", "Enhances mood"]
    },
    {
      id: 5,
      title: "Mental Health",
      description: "Practice mindfulness, meditation, or deep breathing exercises to maintain mental well-being.",
      image: "🧘‍♀️",
      category: "Mental Health",
      benefits: ["Reduces anxiety", "Improves focus", "Better emotional control", "Increases happiness"]
    },
    {
      id: 6,
      title: "Regular Check-ups",
      description: "Schedule regular health check-ups and screenings to catch potential issues early.",
      image: "🏥",
      category: "Prevention",
      benefits: ["Early detection", "Peace of mind", "Better treatment outcomes", "Preventive care"]
    }
  ];

  const nextTip = () => {
    setActiveTip((prev) => (prev + 1) % healthcareTips.length);
  };

  const prevTip = () => {
    setActiveTip((prev) => (prev - 1 + healthcareTips.length) % healthcareTips.length);
  };

  return (
    <div className="healthcare-page">
      <div className="healthcare-hero">
        <h1>Healthcare Tips & Wellness Guide</h1>
        <p>Discover essential tips for maintaining a healthy lifestyle</p>
      </div>

      <div className="tips-container">
        <div className="tip-navigation">
          <button className="nav-btn prev-btn" onClick={prevTip}>
            ‹
          </button>
          
          <div className="tip-indicators">
            {healthcareTips.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeTip ? 'active' : ''}`}
                onClick={() => setActiveTip(index)}
              />
            ))}
          </div>
          
          <button className="nav-btn next-btn" onClick={nextTip}>
            ›
          </button>
        </div>

        <div className="tip-card">
          <div className="tip-header">
            <div className="tip-image">{healthcareTips[activeTip].image}</div>
            <div className="tip-info">
              <h2>{healthcareTips[activeTip].title}</h2>
              <span className="category">{healthcareTips[activeTip].category}</span>
            </div>
          </div>
          
          <p className="tip-description">{healthcareTips[activeTip].description}</p>
          
          <div className="benefits-section">
            <h3>Key Benefits:</h3>
            <div className="benefits-grid">
              {healthcareTips[activeTip].benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <span className="benefit-icon">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="healthcare-grid">
        <div className="grid-item">
          <div className="grid-icon">🏥</div>
          <h3>Preventive Care</h3>
          <p>Regular check-ups and screenings help catch health issues early.</p>
        </div>
        
        <div className="grid-item">
          <div className="grid-icon">🥗</div>
          <h3>Healthy Eating</h3>
          <p>A balanced diet provides essential nutrients for optimal health.</p>
        </div>
        
        <div className="grid-item">
          <div className="grid-icon">🏃‍♂️</div>
          <h3>Physical Activity</h3>
          <p>Regular exercise strengthens your body and improves mental health.</p>
        </div>
        
        <div className="grid-item">
          <div className="grid-icon">😴</div>
          <h3>Quality Sleep</h3>
          <p>Proper rest is essential for recovery and overall well-being.</p>
        </div>
        
        <div className="grid-item">
          <div className="grid-icon">🧘‍♀️</div>
          <h3>Mental Wellness</h3>
          <p>Taking care of your mental health is as important as physical health.</p>
        </div>
        
        <div className="grid-item">
          <div className="grid-icon">💧</div>
          <h3>Stay Hydrated</h3>
          <p>Water is essential for all bodily functions and overall health.</p>
        </div>
      </div>

      <div className="healthcare-stats">
        <div className="stat-card">
          <h3>8+</h3>
          <p>Glasses of Water Daily</p>
        </div>
        <div className="stat-card">
          <h3>30</h3>
          <p>Minutes of Exercise</p>
        </div>
        <div className="stat-card">
          <h3>7-9</h3>
          <p>Hours of Sleep</p>
        </div>
        <div className="stat-card">
          <h3>5</h3>
          <p>Fruits & Vegetables</p>
        </div>
      </div>
    </div>
  );
};

export default HealthcarePage; 