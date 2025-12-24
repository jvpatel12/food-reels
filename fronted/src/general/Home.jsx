import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/home.css";
import apiClient from "../services/api";

function Home() {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef(new Map());

  // 🔹 Fetch food items from backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await apiClient.get("/api/food");

        setVideos(response.data.foodItems);
      } catch (error) {
        console.error("Error fetching food items:", error.message);
      }
    };

    fetchVideos();
  }, []); // ✅ runs only once

  // Autoplay the video that's mostly in view using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      rootMargin: "0px",
      threshold: 0.6, // 60% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const vid = entry.target.querySelector('video');
        if (!vid) return;
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    }, observerOptions);

    const reels = containerRef.current?.querySelectorAll('.video-reel') || [];
    reels.forEach((r) => observer.observe(r));

    return () => observer.disconnect();
  }, [videos]);

  const togglePlay = (e) => {
    const vid = e.currentTarget.querySelector('video');
    if (!vid) return;
    if (vid.paused) vid.play().catch(() => {});
    else vid.pause();
  };

  const handleVisitStore = (partnerId) => {
    // Navigate to partner's profile page
    navigate(`/partner/${partnerId}`);
  };

  if (videos.length === 0) {
    return <div className="no-videos">No videos available</div>;
  }

  return (
    <div className="home-container" ref={containerRef}>
      {videos.map((video) => (
        <div key={video._id} className="video-reel" onClick={togglePlay}>
          <video
            ref={(el) => { if (el) videoRefs.current.set(video._id, el); else videoRefs.current.delete(video._id); }}
            src={video.video}
            alt={video.name}
            className="food-video"
            // hide default controls for mobile-like experience; tap to toggle
            controls={false}
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="video-overlay">
            {video.foodParnter && (
              <div className="partner-info">
                <h4 className="partner-name">{video.foodParnter.name}</h4>
              </div>
            )}
            <h3 className="food-name">{video.name}</h3>
            <p className="video-description">{video.description}</p>

            <button
              className="visit-store-btn"
              onClick={() => handleVisitStore(video.foodParnter?._id)}
            >
              Visit Store
            </button>

            {/* Mobile action bar (right side) */}
            <div className="action-bar">
              <div className="action-item">
                <div className="action-icon">❤️</div>
                <div className="action-count">1.2k</div>
              </div>
              <div className="action-item">
                <div className="action-icon">💬</div>
                <div className="action-count">120</div>
              </div>
              <div className="action-item">
                <div className="action-icon">🔗</div>
                <div className="action-count">Share</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
