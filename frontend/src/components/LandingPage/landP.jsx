import React from 'react';
import './LandingPage.css';

const LandingPage = ({ setCurrentView }) => {
  return (
    <section className="landing-page">
      <div className="landing-content">
        <div className="landing-info">
          <h1 className="landing-title">Find your path after graduation</h1>
          <p className="landing-description">
            Achieve new heights with personalized career guidance — seamlessly manage tasks and 
            progress from your clarity level, started skills, and chosen path. 
            Our platform adapts to where you are, empowering you every step of the way.
          </p>
          <div className="button-container">
            <button 
              onClick={() => setCurrentView('login')} 
              className="btn primary-btn"
            >
              Get Started
            </button>
            <button 
              onClick={() => setCurrentView('signup')} 
              className="btn secondary-btn"
            >
              Create Account
            </button>
          </div>
        </div>
        <div className="landing-features">
          <div className="feature-card">
            <img 
              src="./assets/confuse.png" 
              alt="Confusion rate visualization" 
              className="feature-img"
            />
            <h3>Easy to Use</h3>
            <p>Intuitive interface designed for everyone</p>
          </div>
          <div className="feature-card">
            <img 
              src="./assets/clarity.png" 
              alt="Clarity assessment" 
              className="feature-img"
            />
            <h3>Powerful Features</h3>
            <p>All the tools you need in one place</p>
          </div>
          <div className="feature-card">
            <img 
              src="./assets/path.png" 
              alt="Career path options" 
              className="feature-img"
            />
            <h3>Secure & Reliable</h3>
            <p>Your data is always safe with us</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;