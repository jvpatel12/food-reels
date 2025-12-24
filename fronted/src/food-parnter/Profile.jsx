import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/profile.css'
import apiClient from '../services/api'

function Profile() {
  const [profileData, setProfileData] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // 🔹 Fetch partner profile and videos
  useEffect(() => {
    const fetchProfileAndVideos = async () => {
      try {
        setLoading(true)
        
        // Fetch partner profile
        const profileResponse = await apiClient.get(
          '/api/auth/foodpartner/profile'
        )

        // Fetch partner's videos
        const videosResponse = await apiClient.get(
          '/api/food/partner/videos'
        )

        // Set profile data
        const partner = profileResponse.data.partner
        setProfileData({
          businessName: partner.name,
          email: partner.email,
          address: 'Your address here', // Update backend model to include address
          profileImage: null, // Update backend model to include profileImage
          totalMeals: videosResponse.data.foodItems.length,
          customerServe: 'Coming Soon', // Add this to backend
        })

        // Set videos
        setVideos(videosResponse.data.foodItems)
        setError(null)
      } catch (err) {
        console.error('Error fetching profile and videos:', err.message)
        setError(err.response?.data?.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileAndVideos()
  }, [])

  const handleEditProfile = () => {
    console.log('Edit profile clicked')
    navigate('/edit-profile')
  }

  const handleAddFood = () => {
    console.log('Add food clicked')
    navigate('/add-food')
  }

  // Loading state
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">⚠️ {error}</div>
      </div>
    )
  }

  // No profile data
  if (!profileData) {
    return (
      <div className="profile-container">
        <div className="error-message">⚠️ Unable to load profile</div>
      </div>
    )
  }

  return (
    <div className="profile-container">
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

      {/* Action Buttons */}
      <div className="profile-actions">
        <button className="action-btn btn-primary" onClick={handleAddFood}>
          Add Food
        </button>
        <button className="action-btn btn-secondary" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>

      {/* Videos Section */}
      <div className="profile-videos-section">
        <h2 className="section-title">Food Videos</h2>
        {videos.length === 0 ? (
          <div className="no-videos-message">
            No videos uploaded yet. Click "Add Food" to upload your first food video!
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

export default Profile