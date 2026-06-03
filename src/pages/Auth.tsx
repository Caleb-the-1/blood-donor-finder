import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { signUp, signIn } from '../appwrite'
import SetupProfile from '../components/SetupProfile'
import '../components/SetupProfile.css'

function Auth() {

  const navigate = useNavigate()
const [searchParams]              = useSearchParams()
const registerType                = searchParams.get('type')

const [isLogin, setIsLogin]       = useState(!registerType)
  const [showSetup, setShowSetup]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [userId, setUserId]         = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields!')
      return
    }
    if (!isLogin && !formData.name) {
      alert('Please enter your name!')
      return
    }

    try {
      setLoading(true)

      if (isLogin) {
        await signIn(formData.email, formData.password)
        navigate('/')
      } else {
        const user = await signUp(formData.name, formData.email, formData.password)
        setUserId(user.$id)
        setShowSetup(true)
      }

    } catch (error: any) {
      alert(error.message || 'Something went wrong! Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (showSetup) {
    return <SetupProfile name={formData.name} userId={userId} email={formData.email} />
  }

  return (
    <div className="auth-page">

      {/* Left side — branding */}
      <div className="auth-left">
        <div className="auth-brand">
          <span className="auth-logo">🩸</span>
          <h1 className="auth-brand-name">BloodLink</h1>
          <p className="auth-brand-text">
            Connecting willing donors to people
            in urgent need of blood across Ekiti State.
            Fast. Free. Life-saving.
          </p>
        </div>
        <div className="auth-decoration">
          <span className="auth-deco-drop drop-1">🩸</span>
          <span className="auth-deco-drop drop-2">🩸</span>
          <span className="auth-deco-drop drop-3">🩸</span>
        </div>
      </div>

      {/* Right side — form */}
      <div className="auth-right">
        <div className="auth-card">

          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? 'auth-tab-active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${!isLogin ? 'auth-tab-active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          <h2 className="auth-heading">
            {isLogin ? 'Welcome Back! 👋' : 'Join BloodLink 🩸'}
          </h2>
          <p className="auth-subheading">
            {isLogin
              ? 'Sign in to your donor account'
              : 'Create your free donor account today'}
          </p>

          {!isLogin && (
            <div className="auth-field">
              <label className="auth-label">Full Name</label>
              <input
                className="auth-input"
                type="text"
                name="name"
                placeholder="e.g. Amara Okafor"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="auth-field">
            <label className="auth-label">Email Address</label>
            <input
              className="auth-input"
              type="email"
              name="email"
              placeholder="e.g. amara@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label">Password</label>
            <input
              className="auth-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="auth-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="auth-loading">
                <span className="auth-spinner" />
                {isLogin ? 'Signing In...' : 'Creating Account...'}
              </span>
            ) : (
              isLogin ? '🔑 Sign In' : '🩸 Create Account'
            )}
          </button>

          <p className="auth-switch">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span
              className="auth-switch-link"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </span>
          </p>

        </div>
      </div>

    </div>
  )
}

export default Auth