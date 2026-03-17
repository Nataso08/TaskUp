import './Navbar.css';

// Componente NavButton per i pulsanti di navigazione individuali
function NavButton({ label, href, onClick }) {
  return (
    <a href={href} className="nav-button" onClick={onClick}>
      {label}
    </a>
  );
}

// Componente Navbar principale
function Navbar() {
  const navItems = [
    { id: 1, label: 'Home', href: '#home' },
    { id: 2, label: 'About', href: '#about' },
    { id: 3, label: 'Services', href: '#services' },
    { id: 4, label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
