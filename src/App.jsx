import { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Explore from './pages/Explore'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

const DEFAULT_PROFILE_IMAGE =
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300'

// Deploy test only: force authenticated session by default.
const FORCE_LOGGED_FOR_DEPLOY_TEST = true

const DEPLOY_TEST_USER = {
  name: 'Deploy Tester',
  email: 'deploy-test@taskup.local',
  profileImage: DEFAULT_PROFILE_IMAGE
}

function normalizeUser(userData) {
  if (!userData) {
    return null
  }

  return {
    ...userData,
    profileImage: userData.profileImage || DEFAULT_PROFILE_IMAGE
  }
}

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('taskup_user')
    if (!storedUser) {
      if (FORCE_LOGGED_FOR_DEPLOY_TEST) {
        const defaultLoggedUser = normalizeUser(DEPLOY_TEST_USER)
        localStorage.setItem('taskup_user', JSON.stringify(defaultLoggedUser))
        return defaultLoggedUser
      }

      return null
    }

    const parsedUser = JSON.parse(storedUser)
    const normalizedUser = normalizeUser(parsedUser)

    if (!parsedUser.profileImage) {
      localStorage.setItem('taskup_user', JSON.stringify(normalizedUser))
    }

    return normalizedUser
  })

  const isAuthenticated = useMemo(() => Boolean(user), [user])

  const handleAuthSuccess = (userData) => {
    const normalizedUser = normalizeUser(userData)
    setUser(normalizedUser)
    localStorage.setItem('taskup_user', JSON.stringify(normalizedUser))
  }

  const handleUserUpdate = (updatedFields) => {
    setUser((currentUser) => {
      if (!currentUser) {
        return currentUser
      }

      const nextUser = { ...currentUser, ...updatedFields }
      localStorage.setItem('taskup_user', JSON.stringify(nextUser))
      return nextUser
    })
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('taskup_user')
  }

  return (
    <ThemeProvider>
      <>
        <Navbar
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route
            path="/login"
            element={<Login isAuthenticated={isAuthenticated} onAuthSuccess={handleAuthSuccess} />}
          />
          <Route
            path="/dashboard"
            element={(
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard user={user} />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile user={user} onUserUpdate={handleUserUpdate} />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/explore"
            element={<Explore />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </>
    </ThemeProvider>
  )
}

export default App
