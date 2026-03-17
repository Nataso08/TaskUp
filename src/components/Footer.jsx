import './Footer.css';

// Componente FooterLink per i link del footer
function FooterLink({ label, href }) {
  return (
    <a href={href} className="footer-link">
      {label}
    </a>
  );
}

// Componente FooterSection per le sezioni del footer
function FooterSection({ title, children }) {
  return (
    <div className="footer-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

// Componente Footer principale
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <FooterSection title="About">
            <ul>
              <li><FooterLink label="About Us" href="#about" /></li>
              <li><FooterLink label="Our Team" href="#team" /></li>
              <li><FooterLink label="Careers" href="#careers" /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Services">
            <ul>
              <li><FooterLink label="Product" href="#product" /></li>
              <li><FooterLink label="Pricing" href="#pricing" /></li>
              <li><FooterLink label="Documentation" href="#docs" /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Support">
            <ul>
              <li><FooterLink label="Help Center" href="#help" /></li>
              <li><FooterLink label="Contact Us" href="#contact" /></li>
              <li><FooterLink label="FAQ" href="#faq" /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Legal">
            <ul>
              <li><FooterLink label="Privacy Policy" href="#privacy" /></li>
              <li><FooterLink label="Terms of Service" href="#terms" /></li>
              <li><FooterLink label="Cookie Policy" href="#cookies" /></li>
            </ul>
          </FooterSection>

          <FooterSection title="Follow Us">
            <div className="social-links">
              <a href="https://github.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
              <a href="https://linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href="https://discord.com" className="social-icon" target="_blank" rel="noopener noreferrer">
                Discord
              </a>
            </div>
          </FooterSection>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} TaskUp. All rights reserved.</p>
          </div>
          <div className="footer-credits">
            <p>Made with <span className="heart">♡</span> by TaskUp Team</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
