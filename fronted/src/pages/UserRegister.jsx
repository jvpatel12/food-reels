import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/auth.css'
import apiClient from '../services/api'

export default function UserRegister() {
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
      const response = await apiClient.post(
        '/api/auth/user/register',
        { name, email, password }
      );

      console.log('✅ Registration success:', response.data);
      setLoading(false);
      navigate('/browse');
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
        <div className="auth-title">🎉 Join Us!</div>
        <div className="auth-sub">Create your account to discover amazing food from local partners</div>

        {error && <div className="error-message">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <div>
            <div className="label">Full Name</div>
            <input
              className="input"
              name="name"
              placeholder="Jane Doe"
              required
              disabled={loading}
            />
          </div>

          <div>
            <div className="label">Email Address</div>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="you@example.com"
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
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <Link to="/user/login" className="btn btn-secondary">
          Already have an account? Sign in
        </Link>

        <div className="partner-section">
          <div className="divider-text">Want to sell food?</div>
          <div className="partner-links">
            <Link to="/food-partner/register" className="small-link">
              Register as Food Partner
            </Link>
            <Link to="/food-partner/login" className="small-link">
              Partner Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
