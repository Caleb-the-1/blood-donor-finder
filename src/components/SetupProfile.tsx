import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUserProfile, uploadProfilePicture } from '../appwrite'

interface SetupProfileProps {
  name: string
  userId: string
  email: string
}

function SetupProfile({ name, userId, email }: SetupProfileProps) {

  const navigate = useNavigate()

  const [step, setStep]                   = useState(1)
  const [transitioning, setTransitioning] = useState(false)
  const [profilePic, setProfilePic]       = useState<string | null>(null)
  const [profileFile, setProfileFile]     = useState<File | null>(null)
  const [gender, setGender]               = useState('')
  const [saving, setSaving]               = useState(false)

  function goToNextStep() {
    setTransitioning(true)
    setTimeout(() => {
      setStep(step + 1)
      setTransitioning(false)
    }, 600)
  }

  function handlePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setProfileFile(file)
      const reader = new FileReader()
      reader.onload = () => setProfilePic(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  async function handleFinish() {
    try {
      setSaving(true)

      // Upload picture if chosen
      let pictureId = ''
      if (profileFile) {
        pictureId = await uploadProfilePicture(profileFile)
      }

      // Save profile to database
      await saveUserProfile({
        userId,
        name,
        email,
        gender:     gender || 'Prefer not to say',
        profilePic: pictureId,
      })

      navigate('/welcome')

    } catch (error: any) {
      console.error('Profile save error:', error)
      alert('Error: ' + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="setup-page">

      {/* Step dots */}
      <div className="setup-steps">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`setup-step-dot ${step >= s ? 'step-dot-active' : ''}`}
          />
        ))}
      </div>

      <div className={`setup-card ${transitioning ? 'setup-card-exit' : 'setup-card-enter'}`}>

        {/* STEP 1 — Profile Picture */}
        {step === 1 && (
          <div className="setup-content">
            <span className="setup-emoji">📸</span>
            <h2 className="setup-heading">Add a Profile Picture</h2>
            <p className="setup-subtext">
              Help donors and patients recognise you.
              You can always change this later!
            </p>

            <div className="setup-avatar-wrapper">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="setup-avatar-preview" />
              ) : (
                <div className="setup-avatar-placeholder">
                  <span>👤</span>
                </div>
              )}
            </div>

            <label className="setup-upload-btn">
              📁 Choose Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePicture}
                style={{ display: 'none' }}
              />
            </label>

            <button className="setup-next-btn" onClick={goToNextStep}>
              {profilePic ? 'Continue →' : 'Skip for now →'}
            </button>
          </div>
        )}

        {/* STEP 2 — Gender */}
        {step === 2 && (
          <div className="setup-content">
            <span className="setup-emoji">👤</span>
            <h2 className="setup-heading">What is Your Gender?</h2>
            <p className="setup-subtext">
              This helps us match you with the right donors
              and medical requirements.
            </p>

            <div className="setup-gender-choices">
              {['Male', 'Female', 'Prefer not to say'].map((g) => (
                <button
                  key={g}
                  className={`setup-gender-btn ${gender === g ? 'gender-btn-active' : ''}`}
                  onClick={() => setGender(g)}
                >
                  {g === 'Male' ? '👨 Male' : g === 'Female' ? '👩 Female' : '🤐 Prefer not to say'}
                </button>
              ))}
            </div>

            <button className="setup-next-btn" onClick={goToNextStep}>
              {gender ? 'Continue →' : 'Skip for now →'}
            </button>
          </div>
        )}

        {/* STEP 3 — Done */}
        {step === 3 && (
          <div className="setup-content">

            <div className="setup-success-drop">
              <span className="setup-success-emoji">🩸</span>
              <div className="setup-success-rings">
                <div className="setup-ring ring-a" />
                <div className="setup-ring ring-b" />
                <div className="setup-ring ring-c" />
              </div>
            </div>

            <div className="setup-tick">✓</div>

            <h2 className="setup-heading">
              You're All Set, {name}! 🎉
            </h2>
            <p className="setup-subtext">
              Welcome to BloodLink! Your profile is live
              and you are ready to save lives in Ekiti State.
            </p>

            <button
              className="setup-finish-btn"
              onClick={handleFinish}
              disabled={saving}
            >
              {saving ? '⏳ Saving...' : '🩸 Go to BloodLink'}
            </button>

          </div>
        )}

      </div>

    </div>
  )
}

export default SetupProfile