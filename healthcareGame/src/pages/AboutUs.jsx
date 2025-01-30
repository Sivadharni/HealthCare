import React from "react";
import "../styles/AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
        <p>Learn. Play. Grow.</p>
      </header>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          Welcome to <strong>Quiz & Wellness Hub</strong>, a platform designed to make learning fun and interactive!  
          Our goal is to inspire curiosity and knowledge through engaging quizzes and games, covering topics that 
          matter the most: health, fitness, mental wellness, and general knowledge.
        </p>

        <h2>What We Offer</h2>
        <ul>
          <li>Exciting and educational quizzes across various topics.</li>
          <li>Interactive games designed for all age groups.</li>
          <li>A user-friendly experience to encourage continuous learning.</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          To create an environment where education meets entertainment, allowing users to grow their knowledge 
          while enjoying the process. We believe in learning through play!
        </p>

        <h2>Get Started</h2>
        <p>
          Dive into our quizzes and games to test your knowledge, learn something new, and have fun while doing it.  
          Start your journey today!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;