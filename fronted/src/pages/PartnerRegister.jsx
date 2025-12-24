import React, { useState } from 'react'
import '../css/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function PartnerRegister() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    // Validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/foodpartner/register",
        { name, email, password },
        { withCredentials: true }
      );

      console.log('✅ Partner registration success:', response.data);
      setLoading(false);
      navigate("/create-food");
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMsg);
      console.error('Registration error:', errorMsg);
      setLoading(false);
    }
  }

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-title">🚀 Sell Your Food</div>
        <div className="auth-sub">Register your food business to start uploading and selling delicious food.</div>

        {error && <div className="error-message">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="label">Business Name</div>
            <input
              className="input"
              name="name"
              placeholder="Tasty Bites Restaurant"
              required
              disabled={loading}
            />
          </div>

          <div>
            <div className="label">Email Address</div>
            <input
              className="input"
              type="email"
              name='email'
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
                type={showPassword ? 'text' : 'password'}
                name="password"
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
            <small className="password-hint">Min. 6 characters</small>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create partner account'}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <Link to="/food-partner/login" className="btn btn-secondary">
          Already a partner? Sign in
        </Link>

        <div className="partner-section">
          <div className="divider-text">Not a partner?</div>
          <div className="partner-links">
            <Link to="/user/register" className="small-link">
              Register as Customer
            </Link>
            <Link to="/user/login" className="small-link">
              Customer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
