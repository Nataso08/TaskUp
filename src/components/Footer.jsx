import './Footer.css';
import { useLocation, useNavigate } from 'react-router-dom';

function FooterLink({ label, href, onNavigate }) {
  return (
    <a
      href={href}
      className="footer-link"
      onClick={(event) => onNavigate(event, href)}
    >
      {label}
    </a>
  );
}

// Componente FooterSection per le sezioni del footer
function FooterSection({ title, children, className = '' }) {
  return (
    <div className={`footer-section ${className}`.trim()}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Componente Footer principale
function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (event, href) => {
    event.preventDefault();

    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
        return;
      }

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    navigate(href);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <FooterSection title="Platform">
            <ul>
              <li><FooterLink label="Why TaskUp" href="#about" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="How It Works" href="#how-it-works" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="Explore Workers" href="/explore" onNavigate={handleNavigate} /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Young Workers">
            <ul>
              <li><FooterLink label="Sign In" href="/login" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="Create Your Profile" href="/profile" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="Publish Your Skills" href="#how-it-works" onNavigate={handleNavigate} /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Clients">
            <ul>
              <li><FooterLink label="Login" href="/login" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="Find Workers" href="/explore" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="Contact For Work" href="#how-it-works" onNavigate={handleNavigate} /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Account">
            <ul>
              <li><FooterLink label="Dashboard" href="/dashboard" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="Profile" href="/profile" onNavigate={handleNavigate} /></li>
              <li><FooterLink label="Back to Home" href="#home" onNavigate={handleNavigate} /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Follow Us" className="follow-section">
            <div className="social-links">
              <a href="https://github.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <img className="social-icon-img" src="https://cdn.simpleicons.org/github/1d3a1f" alt="GitHub" />
              </a>
              <a href="https://x.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="X">
                <img className="social-icon-img" src="https://cdn.simpleicons.org/x/1d3a1f" alt="X" />
              </a>
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <img className="social-icon-img" src="https://cdn.simpleicons.org/instagram/1d3a1f" alt="Instagram" />
              </a>
            </div>
          </FooterSection>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} TaskUp. All rights reserved.</p>
          </div>
          <div className="footer-credits">
            <p>Built with <span className="heart">♡</span> for young workers and local clients</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
