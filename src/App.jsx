import { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'

function PlaceholderPage({ title, description }) {
  return (
    <main className="home">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{description}</p>
        </div>
      </section>
    </main>
  )
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
    return storedUser ? JSON.parse(storedUser) : null
  })

  const isAuthenticated = useMemo(() => Boolean(user), [user])

  const handleAuthSuccess = (userData) => {
    setUser(userData)
    localStorage.setItem('taskup_user', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('taskup_user')
  }

  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login isAuthenticated={isAuthenticated} onAuthSuccess={handleAuthSuccess} />}
        />
        <Route
          path="/dashboard"
          element={(
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PlaceholderPage
                title="Your Dashboard"
                description="Track your accepted jobs and manage your activity from here."
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/profile"
          element={(
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PlaceholderPage
                title="Your Profile"
                description="Update your personal info, skills and availability."
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/explore"
          element={<PlaceholderPage title="Explore Jobs" description="Browse nearby opportunities and pick your next task." />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
