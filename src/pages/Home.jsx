import { useState } from 'react';
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

function Home({ isAuthenticated }) {
  const [activeSide, setActiveSide] = useState('worker');
  const hasStoredSession = Boolean(localStorage.getItem('taskup_user'));
  const showDashboardButton = isAuthenticated || hasStoredSession;

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
            {showDashboardButton ? (
              <Link className="btn btn-primary" to="/dashboard">Dashboard</Link>
            ) : (
              <Link className="btn btn-primary" to="/login">Sign In</Link>
            )}
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

      <section id="how-it-works" className="benefits-section">
        <div className="section-header how-header">
          <h2>How It Works</h2>
          <div className="how-switch">
            <button
              type="button"
              className={`how-switch-btn ${activeSide === 'worker' ? 'active' : ''}`}
              onClick={() => setActiveSide('worker')}
            >
              I'm a young worker
            </button>
            <button
              type="button"
              className={`how-switch-btn ${activeSide === 'client' ? 'active' : ''}`}
              onClick={() => setActiveSide('client')}
            >
              I'm searching workers
            </button>
          </div>
        </div>

        <div className={`benefits-container how-layout ${activeSide === 'worker' ? 'active-worker' : 'active-client'}`}>
          <article
            className={`how-panel worker-panel ${activeSide === 'worker' ? 'active' : ''}`}
            onClick={() => setActiveSide('worker')}
          >
            <img
              className="how-side-image"
              src="https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Young worker doing gardening activities"
            />
            <h4>I'm a young worker</h4>
            <ul>
              <li>Create your account in a few steps.</li>
              <li>Publish your skills in your personal profile.</li>
              <li>Create job offers for the services you can provide.</li>
            </ul>
          </article>

          <article
            className={`how-panel client-panel ${activeSide === 'client' ? 'active' : ''}`}
            onClick={() => setActiveSide('client')}
          >
            <img
              className="how-side-image"
              src="https://images.pexels.com/photos/7709151/pexels-photo-7709151.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Client browsing and contacting workers online"
            />
            <h4>I'm searching workers</h4>
            <ul>
              <li>Log in and access your client area.</li>
              <li>Search and find workers in your local area.</li>
              <li>Contact them directly for the work you need.</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="explore" className="cta-section">
        <h2>Ready to start?</h2>
        <p>Join TaskUp and discover local opportunities today.</p>
        <div className="hero-buttons">
          {showDashboardButton ? (
            <Link className="btn btn-large" to="/dashboard">Dashboard</Link>
          ) : (
            <Link className="btn btn-large" to="/login">Sign In</Link>
          )}
          <Link className="btn btn-secondary" to="/explore">Explore</Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
