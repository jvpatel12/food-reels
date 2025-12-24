import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../css/profile.css'
import axios from 'axios'

function PartnerProfile() {
  const { partnerId } = useParams()
  const [profileData, setProfileData] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // 🔹 Fetch partner profile and videos by partner ID
  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        setLoading(true)

        // Fetch partner's videos
        const videosResponse = await axios.get(
          `http://localhost:3000/api/food`,
          { withCredentials: true }
        )

        // Filter videos for this partner
        const partnerVideos = videosResponse.data.foodItems.filter(
          (video) => video.foodParnter._id === partnerId
        )

        // Get partner info from first video
        if (partnerVideos.length > 0) {
          const partner = partnerVideos[0].foodParnter
          setProfileData({
            id: partner._id,
            businessName: partner.name,
            email: partner.email,
            address: 'Coming Soon',
            profileImage: null,
            totalMeals: partnerVideos.length,
            customerServe: 'Coming Soon',
          })
          setVideos(partnerVideos)
        } else {
          setError('Partner not found or has no videos')
        }
        setError(null)
      } catch (err) {
        console.error('Error fetching partner data:', err.message)
        setError(err.response?.data?.message || 'Failed to load partner profile')
      } finally {
        setLoading(false)
      }
    }

    if (partnerId) {
      fetchPartnerData()
    }
  }, [partnerId])

  const handleBackHome = () => {
    navigate('/')
  }

  // Loading state
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading partner profile...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">⚠️ {error}</div>
        <button className="action-btn btn-primary" onClick={handleBackHome} style={{ marginTop: '20px' }}>
          Back to Home
        </button>
      </div>
    )
  }

  // No profile data
  if (!profileData) {
    return (
      <div className="profile-container">
        <div className="error-message">⚠️ Unable to load partner profile</div>
        <button className="action-btn btn-primary" onClick={handleBackHome} style={{ marginTop: '20px' }}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="profile-container">
      {/* Back Button */}
      <button className="back-button" onClick={handleBackHome}>
        ← Back
      </button>

      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-picture">
          {profileData.profileImage ? (
            <img src={profileData.profileImage} alt={profileData.businessName} />
          ) : (
            <div style={{ width: '100%', height: '100%' }}></div>
          )}
        </div>
        <div className="profile-info">
          <div className="business-name">{profileData.businessName}</div>
          <div className="business-address">{profileData.address}</div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats">
        <div className="stat-card">
          <div className="stat-label">Total Meals</div>
          <div className="stat-value">{profileData.totalMeals}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Customer Serve</div>
          <div className="stat-value">{profileData.customerServe}</div>
        </div>
      </div>

      {/* Videos Section */}
      <div className="profile-videos-section">
        <h2 className="section-title">Food Videos</h2>
        {videos.length === 0 ? (
          <div className="no-videos-message">
            No videos available from this partner.
          </div>
        ) : (
          <div className="videos-grid">
            {videos.map((video) => (
              <div key={video._id} className="video-card">
                <video muted loop playsInline>
                  <source src={video.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="video-info">
                  <h4>{video.name}</h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default PartnerProfile
