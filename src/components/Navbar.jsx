import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo2.svg';
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
  const [avatarLoadError, setAvatarLoadError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = useRef(null);

  const navItems = [
    { id: 1, label: 'Home', action: 'home' },
    { id: 2, label: 'Why TaskUp', action: 'about' },
    { id: 3, label: 'How It Works', action: 'how' },
    { id: 4, label: 'Explore', action: 'explore' }
  ];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    setAvatarLoadError(false);
  }, [user?.profileImage]);

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

    const sectionSelector = action === 'home'
      ? '#home'
      : action === 'about'
        ? '#about'
        : '#how-it-works';

    if (location.pathname !== '/') {
      navigate(`/${sectionSelector}`);
      return;
    }

    scrollToSection(sectionSelector);
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    onLogout();
    navigate('/');
  };

  const getUserInitials = () => {
    const names = user?.name.trim().split(' ') || [];
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return user?.name?.charAt(0).toUpperCase() || 'U';
  };


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <img src={logo} alt="TaskUp" className="navbar-logo" />
        </div>
        <div className="navbar-menu">
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              onClick={() => handleNavClick(item.action)}
            />
          ))}

          <ThemeToggle />

          {!isAuthenticated ? (
            <Link to="/login" className="nav-button signin-button">
              Sign In
            </Link>
          ) : (
            <div className="profile-menu" ref={profileMenuRef}>
              <button
                type="button"
                className="navbar-profile-avatar"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                aria-label="Open profile menu"
              >
                {user?.profileImage && !avatarLoadError ? (
                  <img
                    className="navbar-profile-avatar-img"
                    src={user.profileImage}
                    alt={user?.name || 'Profile'}
                    onError={() => setAvatarLoadError(true)}
                  />
                ) : (
                  <span className="navbar-profile-avatar-text">{getUserInitials()}</span>
                )}
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
