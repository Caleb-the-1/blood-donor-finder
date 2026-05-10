import React from 'react'

function Profile() {
  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* Avatar */}
        <div className="profile-avatar-wrapper">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="profile-avatar"
          />
        </div>

        {/* Details */}
        <h2 className="profile-name">Chidi Nwosu</h2>
        <span className="profile-blood-type">A+</span>
        <p className="profile-location">📍 Ado-Ekiti, Ekiti</p>
        <p className="profile-status">✅ Available to Donate</p>

        {/* Stats */}
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-number">12</span>
            <span className="profile-stat-label">Donations</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-number">12</span>
            <span className="profile-stat-label">Lives Saved</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-number">4.9</span>
            <span className="profile-stat-label">Rating</span>
          </div>
        </div>

        {/* Edit button */}
        <button className="profile-edit-btn">✏️ Edit Profile</button>

      </div>

    </div>
  )
}

export default Profile