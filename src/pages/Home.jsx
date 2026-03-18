import { Link } from 'react-router-dom';
import './Home.css';

function Feature({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const features = [
    {
      id: 1,
      icon: '📍',
      title: 'Nearby Opportunities',
      description: 'Discover practical, local jobs in your area with just a few taps.'
    },
    {
      id: 2,
      icon: '🛠️',
      title: 'Hands-On Tasks',
      description: 'From gardening and yard care to quick fixes, find real-world tasks that match your skills.'
    },
    {
      id: 3,
      icon: '🤝',
      title: 'Safe Community',
      description: 'Build trust with profiles, reviews, and a community focused on reliability.'
    }
  ];

  return (
    <main className="home">
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Local Jobs. Get Things Done.</h1>
          <p className="hero-subtitle">
            TaskUp helps young people find simple manual jobs nearby: quick gigs,
            gardening jobs, practical tasks, and opportunities to earn while helping their local community.
          </p>
          <div className="hero-buttons">
            <Link className="btn btn-primary" to="/login">Sign In</Link>
            <Link className="btn btn-secondary" to="/explore">Explore Jobs</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h4>Fast</h4>
              <p>Start in minutes</p>
            </div>
            <div className="stat">
              <h4>Local</h4>
              <p>Jobs around you</p>
            </div>
            <div className="stat">
              <h4>Simple</h4>
              <p>Garden & outdoor friendly</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="features-section">
        <div className="section-header">
          <h2>Why TaskUp</h2>
          <p>A practical platform built for real, everyday outdoor and manual work.</p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <Feature
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
            <h2>How It Works</h2>
            <ul className="benefits-list">
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <h4>Sign Up</h4>
                  <p>Create your account and set your location in a few simple steps.</p>
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <h4>Explore Tasks</h4>
                  <p>Browse nearby opportunities like gardening, cleanup and small manual jobs.</p>
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <h4>Manage Everything</h4>
                  <p>Use your dashboard to track accepted jobs and your activity.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="benefits-image">
            <div className="image-placeholder">
              <span>🌿 TaskUp for local gardening jobs</span>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="cta-section">
        <h2>Ready to start?</h2>
        <p>Join TaskUp and discover local opportunities today.</p>
        <div className="hero-buttons">
          <Link className="btn btn-large" to="/login">Sign In</Link>
          <Link className="btn btn-secondary" to="/explore">Explore</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
