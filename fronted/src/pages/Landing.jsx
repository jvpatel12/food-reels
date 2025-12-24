import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/landing.css'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-container">
      <nav className="landing-navbar">
        <div className="logo">🍽️ FoodReels</div>
        <div className="nav-buttons">
          <button className="nav-btn nav-login" onClick={() => navigate('/user/login')}>
            Sign In
          </button>
          <button className="nav-btn nav-register" onClick={() => navigate('/user/register')}>
            Register
          </button>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Delicious Food</h1>
          <p className="hero-subtitle">
            Browse short food videos from local partners and order your favorite meals in seconds
          </p>

          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">📹</span>
              <span className="feature-text">Watch short food videos</span>
            </div>
            <div className="feature">
              <span className="feature-icon">👨‍🍳</span>
              <span className="feature-text">From local restaurants</span>
            </div>
            <div className="feature">
              <span className="feature-icon">⚡</span>
              <span className="feature-text">Order in seconds</span>
            </div>
          </div>

          <button className="cta-button" onClick={() => navigate('/user/register')}>
            Get Started →
          </button>

          <div className="alt-actions">
            <span className="alt-text">Already have an account?</span>
            <button className="alt-link" onClick={() => navigate('/user/login')}>
              Sign In
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="video-preview">
                <div className="play-icon">▶</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features">
        <h2>Why Choose FoodReels?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">1</div>
            <h3>Browse Reels</h3>
            <p>Discover food videos like Instagram and TikTok. Scroll through delicious meals from local partners.</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">2</div>
            <h3>Visit Stores</h3>
            <p>Click on any video to visit the partner's profile and see their complete food catalog.</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">3</div>
            <h3>Order Easily</h3>
            <p>Place your order directly from the partner's store page and enjoy fast delivery.</p>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Ready to Explore?</h2>
        <p>Create your account and start discovering amazing food today</p>
        <div className="cta-buttons">
          <button className="cta-button primary" onClick={() => navigate('/user/register')}>
            Sign Up for Free
          </button>
          <button className="cta-button secondary" onClick={() => navigate('/user/login')}>
            I Already Have an Account
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>For Customers</h4>
            <a href="#" onClick={() => navigate('/user/register')}>Sign Up</a>
            <a href="#" onClick={() => navigate('/user/login')}>Sign In</a>
          </div>
          <div className="footer-section">
            <h4>For Partners</h4>
            <a href="#" onClick={() => navigate('/food-partner/register')}>Register Business</a>
            <a href="#" onClick={() => navigate('/food-partner/login')}>Partner Login</a>
          </div>
          <div className="footer-section">
            <h4>About</h4>
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 FoodReels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
