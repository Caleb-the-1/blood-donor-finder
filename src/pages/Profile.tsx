import { useState, useEffect } from 'react'
import { getCurrentUser, getUserProfile, signOut, getProfilePictureUrl } from '../appwrite'
import { useNavigate } from 'react-router-dom'
import AvailabilityToggle from '../components/AvailabilityToggle'
import '../components/AvailabilityToggle.css'

function Profile() {

  const navigate = useNavigate()
  const [user, setUser]       = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const currentUser = await getCurrentUser()
        if (currentUser) {
          setUser(currentUser)
          const userProfile = await getUserProfile(currentUser.$id)
          setProfile(userProfile)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  async function handleSignOut() {
    try {
      await signOut()
      navigate('/auth')
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-loading">
          <span className="profile-loading-drop">🩸</span>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <span style={{ fontSize: '3rem' }}>👤</span>
          <h2 className="profile-name">Not Signed In</h2>
          <p className="profile-location">
            Sign in to see your profile
          </p>
          <button
            className="profile-edit-btn"
            onClick={() => navigate('/auth')}
          >
            🔐 Sign In / Sign Up
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">

      <div className="profile-card">

        {/* Avatar */}
        <div className="profile-avatar-wrapper">
        {profile?.profilePic ? (
  <img
    src={getProfilePictureUrl(profile.profilePic)}
    alt="Profile"
    className="profile-avatar"
  />
) : (
  <div className="profile-avatar-placeholder">
    {user.name?.charAt(0).toUpperCase()}
  </div>
)}
        </div>

        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-location">📧 {user.email}</p>

        {profile?.gender && (
          <p className="profile-location">
            {profile.gender === 'Male' ? '👨' : profile.gender === 'Female' ? '👩' : '🤐'} {profile.gender}
          </p>
        )}

        {profile?.bloodType && (
          <span className="profile-blood-type">{profile.bloodType}</span>
        )}

        {profile?.location && (
          <p className="profile-location">📍 {profile.location}</p>
        )}

        {/* Stats */}
        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-number">0</span>
            <span className="profile-stat-label">Donations</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-number">0</span>
            <span className="profile-stat-label">Lives Saved</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-number">New</span>
            <span className="profile-stat-label">Member</span>
          </div>
        </div>

        <button
  className="profile-edit-btn"
  onClick={() => navigate('/edit-profile')}
>
  ✏️ Edit Profile
</button>

        {/* Sign out button */}
        <button className="profile-signout-btn" onClick={handleSignOut}>
          🚪 Sign Out
        </button>

      </div>

      <div style={{ marginTop: '2rem' }}>
        <AvailabilityToggle />
      </div>

    </div>
  )
}

export default Profile