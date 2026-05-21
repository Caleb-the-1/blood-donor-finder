import AvailabilityToggle from '../components/AvailabilityToggle'
import '../components/AvailabilityToggle.css'

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

        <h2 className="profile-name">Chidi Nwosu</h2>
        <span className="profile-blood-type">A+</span>
        <p className="profile-location">📍 Ado-Ekiti, Ekiti</p>

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

        <button className="profile-edit-btn">✏️ Edit Profile</button>

      </div>

      {/* Availability toggle below profile card */}
      <div style={{ marginTop: '2rem' }}>
        <AvailabilityToggle />
      </div>

    </div>
  )
}

export default Profile