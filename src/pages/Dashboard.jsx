import './Dashboard.css'

function Dashboard({ user }) {
  const firstName = user?.name?.split(' ')[0] || 'User'

  return (
    <main className="dashboard-page">
      <section className="dashboard-header">
        <h1>Welcome back, {firstName}</h1>
        <p>Track your local jobs, responses and profile progress from one place.</p>
      </section>

      <section className="dashboard-stats">
        <article className="dashboard-card">
          <h3>Active Job Offers</h3>
          <p className="dashboard-value">4</p>
          <span>2 new contacts this week</span>
        </article>

        <article className="dashboard-card">
          <h3>Accepted Jobs</h3>
          <p className="dashboard-value">12</p>
          <span>+3 compared to last month</span>
        </article>

        <article className="dashboard-card">
          <h3>Average Rating</h3>
          <p className="dashboard-value">4.8 / 5</p>
          <span>Based on 39 client reviews</span>
        </article>
      </section>

      <section className="dashboard-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>New request received for garden cleanup in Bologna - Mazzini.</li>
          <li>Your profile was viewed 8 times in the last 24 hours.</li>
          <li>Client review added: “Great communication and punctual work.”</li>
        </ul>
      </section>
    </main>
  )
}

export default Dashboard
