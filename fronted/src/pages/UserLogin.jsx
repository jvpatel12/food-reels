import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/auth.css";
import apiClient from "../services/api";

export default function UserLogin() {
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
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await apiClient.post(
        "/api/auth/user/login",
        { email, password }
      );

      console.log("✅ Login success:", response.data);
      setLoading(false);
      navigate("/browse");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      console.error("Login error:", errorMsg);
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="auth-card">
        <div className="auth-title">👋 Welcome back!</div>
        <div className="auth-sub">Sign in to your user account and browse delicious food</div>

        {error && <div className="error-message">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
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
                type={showPassword ? "text" : "password"}
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
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="auth-divider">OR</div>

        <Link to="/user/register" className="btn btn-secondary">
          Don't have an account? Register
        </Link>

        <div className="partner-section">
          <div className="divider-text">Food Partner?</div>
          <div className="partner-links">
            <Link to="/food-partner/login" className="small-link">
              Partner Login
            </Link>
            <Link to="/food-partner/register" className="small-link">
              Register as Partner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
