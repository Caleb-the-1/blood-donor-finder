import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  getCurrentUser,
  getUserProfile,
  uploadProfilePicture,
  getProfilePictureUrl,
  databases
} from '../appwrite'

const DATABASE_ID = '6a18b7cb002c5942fb51'
const USERS_TABLE = 'users'

function EditProfile() {

  const navigate = useNavigate()

  const [user, setUser]           = useState<any>(null)
  const [profile, setProfile]     = useState<any>(null)
  const [loading, setLoading]     = useState(true)
  const [saving, setSaving]       = useState(false)
  const [profilePic, setProfilePic] = useState<string | null>(null)
  const [profileFile, setProfileFile] = useState<File | null>(null)
  const [success, setSuccess]     = useState(false)

  const [formData, setFormData] = useState({
    name:      '',
    bloodType: '',
    location:  '',
    gender:    '',
  })

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  const genders    = ['Male', 'Female', 'Prefer not to say']

  useEffect(() => {
    async function fetchData() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
          navigate('/auth')
          return
        }
        setUser(currentUser)
        const userProfile = await getUserProfile(currentUser.$id)
        if (userProfile) {
          setProfile(userProfile)
          setFormData({
            name:      currentUser.name || '',
            bloodType: userProfile.bloodType || '',
            location:  userProfile.location  || '',
            gender:    userProfile.gender    || '',
          })
          if (userProfile.profilePic) {
            setProfilePic(getProfilePictureUrl(userProfile.profilePic))
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setProfileFile(file)
      const reader = new FileReader()
      reader.onload = () => setProfilePic(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  async function handleSave() {
    if (!formData.name || !formData.bloodType || !formData.location) {
      alert('Please fill in name, blood type and location!')
      return
    }

    try {
      setSaving(true)

      let pictureId = profile?.profilePic || ''
      if (profileFile) {
        pictureId = await uploadProfilePicture(profileFile)
      }

      // Update the users table document
      await databases.updateDocument(
        DATABASE_ID,
        USERS_TABLE,
        profile.$id,
        {
          name:       formData.name,
          bloodType:  formData.bloodType,
          location:   formData.location,
          gender:     formData.gender || 'Prefer not to say',
          profilePic: pictureId,
        }
      )

      setSuccess(true)
      setTimeout(() => {
        navigate('/profile')
      }, 1500)

    } catch (error: any) {
      alert('Error saving profile: ' + error.message)
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="edit-page">
        <div className="edit-loading">
          <span className="edit-loading-drop">🩸</span>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-page">

      <div className="edit-card">

        {/* Header */}
        <div className="edit-header">
          <button className="edit-back-btn" onClick={() => navigate('/profile')}>
            ← Back
          </button>
          <h2 className="edit-title">Edit Profile</h2>
        </div>

        {/* Success message */}
        {success && (
          <div className="edit-success">
            ✅ Profile updated successfully! Redirecting...
          </div>
        )}

        {/* Profile picture */}
        <div className="edit-avatar-section">
          <div className="edit-avatar-wrapper">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="edit-avatar-img" />
            ) : (
              <div className="edit-avatar-placeholder">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <label className="edit-upload-btn">
            📸 Change Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePicture}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* Name */}
        <div className="edit-field">
          <label className="edit-label">Full Name</label>
          <input
            className="edit-input"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Blood Type */}
        <div className="edit-field">
          <label className="edit-label">🩸 Blood Type</label>
          <div className="edit-blood-grid">
            {bloodTypes.map((type) => (
              <button
                key={type}
                className={`edit-blood-btn ${formData.bloodType === type ? 'edit-blood-active' : ''}`}
                onClick={() => setFormData({ ...formData, bloodType: type })}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="edit-field">
          <label className="edit-label">📍 Location</label>
          <input
            className="edit-input"
            type="text"
            placeholder="e.g. Ado-Ekiti, Ekiti"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        {/* Gender */}
        <div className="edit-field">
          <label className="edit-label">Gender</label>
          <div className="edit-gender-choices">
            {genders.map((g) => (
              <button
                key={g}
                className={`edit-gender-btn ${formData.gender === g ? 'edit-gender-active' : ''}`}
                onClick={() => setFormData({ ...formData, gender: g })}
              >
                {g === 'Male' ? '👨 Male' : g === 'Female' ? '👩 Female' : '🤐 Prefer not to say'}
              </button>
            ))}
          </div>
        </div>

        {/* Save button */}
        <button
          className="edit-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? '⏳ Saving...' : '✅ Save Changes'}
        </button>

      </div>

    </div>
  )
}

export default EditProfile