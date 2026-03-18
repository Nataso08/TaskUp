import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavButton({ label, onClick }) {
  return (
    <button type="button" className="nav-button" onClick={onClick}>
      {label}
    </button>
  );
}

function Navbar({ isAuthenticated, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  const navItems = [
    { id: 1, label: 'Home', action: 'home' },
    { id: 2, label: 'How It Works', action: 'about' },
    { id: 3, label: 'Explore', action: 'explore' }
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const scrollToSection = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (action) => {
    if (action === 'explore') {
      navigate('/explore');
      return;
    }

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scrollToSection(action === 'home' ? '#home' : '#about');
      }, 0);
      return;
    }

    scrollToSection(action === 'home' ? '#home' : '#about');
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
    navigate('/');
  };

  const userInitial = (user?.name || 'U').charAt(0).toUpperCase();


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>TaskUp</h1>
        </div>
        <div className="navbar-menu">
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              onClick={() => handleNavClick(item.action)}
            />
          ))}

          {!isAuthenticated ? (
            <Link to="/login" className="nav-button signin-button">
              Sign In
            </Link>
          ) : (
            <div className="profile-menu" ref={profileMenuRef}>
              <button
                type="button"
                className="profile-avatar"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Open profile menu"
              >
                {userInitial}
              </button>

              {isMenuOpen && (
                <div className="profile-dropdown">
                  <Link to="/dashboard" className="profile-option">Dashboard</Link>
                  <Link to="/profile" className="profile-option">Profile</Link>
                  <button type="button" className="profile-option logout-option" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
