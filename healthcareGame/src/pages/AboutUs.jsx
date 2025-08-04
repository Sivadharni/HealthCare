import React, { useState, useEffect } from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Healthcare Expert",
      specialty: "Preventive Medicine",
      avatar: "👩‍⚕️"
    },
    {
      name: "Mike Chen",
      role: "Fitness Specialist",
      specialty: "Physical Wellness",
      avatar: "💪"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Mental Health Advisor",
      specialty: "Wellness Psychology",
      avatar: "🧠"
    }
  ];

  const features = [
    {
      icon: "🏥",
      title: "Healthcare Focus",
      description: "Comprehensive health and wellness education through interactive quizzes"
    },
    {
      icon: "🎯",
      title: "Personalized Learning",
      description: "Track your progress and improve your health knowledge daily"
    },
    {
      icon: "🌟",
      title: "Expert Guidance",
      description: "Content curated by healthcare professionals and wellness experts"
    },
    {
      icon: "📊",
      title: "Progress Tracking",
      description: "Monitor your health knowledge growth with detailed analytics"
    }
  ];

  return (
    <div className="about-container">
      <div className="about-background">
        <div className="floating-shapes">
          <div className="shape shape-1">🏥</div>
          <div className="shape shape-2">💊</div>
          <div className="shape shape-3">❤️</div>
          <div className="shape shape-4">🧬</div>
          <div className="shape shape-5">🩺</div>
        </div>
      </div>

      <header className="about-header">
        <h1 className="animated-title">About Us</h1>
        <p className="animated-subtitle">Empowering Health Through Knowledge</p>
        <div className="healthcare-icons">
          <span className="health-icon">🏥</span>
          <span className="health-icon">💊</span>
          <span className="health-icon">❤️</span>
          <span className="health-icon">🧬</span>
        </div>
      </header>

      <section className="about-content">
        <div className="mission-section">
          <h2 className="section-title">Our Mission</h2>
          <div className="mission-card">
            <div className="mission-icon">🎯</div>
            <p>
              At <strong>Healthcare Quiz Hub</strong>, we're dedicated to making health education 
              accessible, engaging, and effective. Our platform combines the power of interactive 
              learning with comprehensive healthcare knowledge to empower individuals to make 
              informed health decisions.
            </p>
          </div>
        </div>

        <div className="features-section">
          <h2 className="section-title">What We Offer</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${activeSection === index ? 'active' : ''}`}
                onClick={() => setActiveSection(index)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="team-section">
          <h2 className="section-title">Our Expert Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-specialty">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-section">
          <h2 className="section-title">Our Impact</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Health Topics</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10K+</div>
              <div className="stat-label">Active Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">User Satisfaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </div>

        <div className="vision-section">
          <h2 className="section-title">Our Vision</h2>
          <div className="vision-card">
            <div className="vision-icon">🌟</div>
            <p>
              We envision a world where everyone has access to reliable, engaging health education. 
              Through our interactive platform, we're building a community of health-conscious 
              individuals who are empowered to take control of their wellness journey.
            </p>
          </div>
        </div>

        <div className="cta-section">
          <h2 className="section-title">Ready to Start Your Health Journey?</h2>
          <div className="cta-card">
            <p>
              Join thousands of users who are already improving their health knowledge 
              through our interactive quizzes and wellness challenges!
            </p>
            <div className="cta-buttons">
              <button className="cta-button primary">Start Learning</button>
              <button className="cta-button secondary">Explore Topics</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;