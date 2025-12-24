import React, { useState } from 'react'
import '../css/auth.css'
import apiClient from '../services/api';
import { Link, useNavigate } from 'react-router-dom';

export default function PartnerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post(
        "/api/auth/foodpartner/login",
        { email, password }
      );

      console.log("✅ Partner login success:", response.data);
      setLoading(false);
      
      // Navigate to partner profile/dashboard
      navigate("/food-partner/profile");
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMsg);
      console.error('Login error:', errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-title">👨‍🍳 Partner Sign In</div>
        <div className="auth-sub">Access your partner dashboard, manage videos and orders.</div>

        {error && <div className="error-message">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="label">Email Address</div>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="partner@business.com"
              required
              disabled={loading}
            />
          </div>

          <div>
            <div className="label">Password</div>
            <div className="password-input-wrapper">
              <input
                className="input"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <Link to="/food-partner/register" className="btn btn-secondary">
          Don't have an account? Register
        </Link>

        <div className="partner-section">
          <div className="divider-text">Looking to order?</div>
          <div className="partner-links">
            <Link to="/user/login" className="small-link">
              Customer Login
            </Link>
            <Link to="/user/register" className="small-link">
              Register as Customer
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
