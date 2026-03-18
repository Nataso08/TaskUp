import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ isAuthenticated, onAuthSuccess }) {
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const userName = isRegisterMode
      ? formData.fullName.trim()
      : formData.email.split('@')[0]

    onAuthSuccess({
      name: userName || 'TaskUp User',
      email: formData.email
    })

    navigate('/')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>{isRegisterMode ? 'Create your account' : 'Sign in to TaskUp'}</h1>
        <p>
          {isRegisterMode
            ? 'Register and start finding local gardening and manual jobs.'
            : 'Access your account to manage profile and job activity.'}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegisterMode && (
            <label>
              Full name
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </label>

          <button className="auth-submit" type="submit">
            {isRegisterMode ? 'Register' : 'Sign In'}
          </button>
        </form>

        <button
          className="auth-switch"
          type="button"
          onClick={() => setIsRegisterMode((prev) => !prev)}
        >
          {isRegisterMode
            ? 'Already have an account? Sign In'
            : "Don't have an account? Register"}
        </button>
      </section>
    </main>
  )
}

export default Login
