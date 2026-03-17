import './Home.css';

// Componente Feature per presentare le caratteristiche
function Feature({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Componente Home principale
function Home() {
  const features = [
    {
      id: 1,
      icon: '📋',
      title: 'Gestione Semplice',
      description: 'Organizzi le tue attività con un\'interfaccia intuitiva e facile da usare.'
    },
    {
      id: 2,
      icon: '⏰',
      title: 'Tracciamento Tempo',
      description: 'Monitora il tempo dedicato a ogni task e analizza la tua produttività.'
    },
    {
      id: 3,
      icon: '👥',
      title: 'Collaborazione',
      description: 'Condividi progetti e collabora con il tuo team in tempo reale.'
    },
    {
      id: 4,
      icon: '📊',
      title: 'Statistiche Dettagliate',
      description: 'Visualizza grafici e report per migliorare la tua efficienza.'
    },
    {
      id: 5,
      icon: '🔔',
      title: 'Notifiche Smart',
      description: 'Ricevi notifiche intelligenti su scadenze e priorità importanti.'
    },
    {
      id: 6,
      icon: '☁️',
      title: 'Sincronizzazione Cloud',
      description: 'Accedi ai tuoi task da qualsiasi dispositivo, sempre sincronizzati.'
    }
  ];

  return (
    <main className="home">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Aumenta la Tua Produttività</h1>
          <p className="hero-subtitle">
            TaskUp è la soluzione completa per gestire i tuoi task, monitorare il tuo tempo e 
            collaborare con il tuo team. Semplice, potente e intuitivo.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Inizia Gratuitamente</button>
            <button className="btn btn-secondary">Guarda Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h4>10K+</h4>
              <p>Utenti Attivi</p>
            </div>
            <div className="stat">
              <h4>50M+</h4>
              <p>Task Completati</p>
            </div>
            <div className="stat">
              <h4>99.9%</h4>
              <p>Uptime Garantito</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="services" className="features-section">
        <div className="section-header">
          <h2>Le Nostre Caratteristiche</h2>
          <p>Tutto quello che ti serve per essere più produttivo</p>
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

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
            <h2>Perché Scegliere TaskUp?</h2>
            <ul className="benefits-list">
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <h4>Facile da Usare</h4>
                  <p>Non occorre training complesso. Comincia subito.</p>
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <h4>Sempre Aggiornato</h4>
                  <p>Nuove feature aggiunte regolarmente based su esigenze reali.</p>
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <h4>Supporto 24/7</h4>
                  <p>Il nostro team è sempre disponibile per aiutarti.</p>
                </div>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <div>
                  <h4>Sicurezza Garantita</h4>
                  <p>I tuoi dati sono protetti con crittografia end-to-end.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="benefits-image">
            <div className="image-placeholder">
              <span>📱 TaskUp Interface</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="section-header">
          <h2>Piani Semplici e Trasparenti</h2>
          <p>Scegli il piano che fa per te</p>
        </div>
        <div className="pricing-cards">
          <div className="pricing-card">
            <h3>Free</h3>
            <p className="price">Gratuito</p>
            <p className="description">Perfetto per iniziare</p>
            <ul className="pricing-features">
              <li>✓ Fino a 10 task</li>
              <li>✓ 1 utente</li>
              <li>✓ Supporto email</li>
              <li>✗ Analitiche avanzate</li>
            </ul>
            <button className="btn btn-outline">Inizia</button>
          </div>

          <div className="pricing-card featured">
            <span className="badge">Popolare</span>
            <h3>Pro</h3>
            <p className="price">€9<span>/mese</span></p>
            <p className="description">Per il lavoro quotidiano</p>
            <ul className="pricing-features">
              <li>✓ Task illimitati</li>
              <li>✓ Fino a 5 utenti</li>
              <li>✓ Supporto prioritario</li>
              <li>✓ Analitiche avanzate</li>
            </ul>
            <button className="btn btn-primary">Prova Gratis</button>
          </div>

          <div className="pricing-card">
            <h3>Enterprise</h3>
            <p className="price">Personalizzato</p>
            <p className="description">Per team grandi</p>
            <ul className="pricing-features">
              <li>✓ Tutto di Pro</li>
              <li>✓ Utenti illimitati</li>
              <li>✓ Supporto dedicato</li>
              <li>✓ Integrazioni custom</li>
            </ul>
            <button className="btn btn-outline">Contattaci</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Pronto a Aumentare la Tua Produttività?</h2>
        <p>Unisciti a migliaia di utenti che già usano TaskUp</p>
        <button className="btn btn-large">Inizia Gratis Oggi</button>
      </section>
    </main>
  );
}

export default Home;
