import './Dashboard.css'

const recentActivities = [
  {
    id: 1,
    job: 'Garden cleanup',
    place: 'Bologna - Mazzini',
    date: '20 Mar 2026',
    time: '15:30',
    status: 'New request',
    client: 'Luca B.'
  },
  {
    id: 2,
    job: 'Small moving support',
    place: 'Bologna - San Donato',
    date: '19 Mar 2026',
    time: '10:00',
    status: 'Accepted',
    client: 'Marta G.'
  },
  {
    id: 3,
    job: 'Lawn care',
    place: 'Casalecchio di Reno',
    date: '18 Mar 2026',
    time: '17:45',
    status: 'Completed',
    client: 'Franco R.'
  }
]

const reviews = [
  {
    id: 1,
    author: 'Elisa T.',
    date: '17 Mar 2026',
    rating: 5,
    job: 'Garden cleanup',
    text: 'Great communication and punctual work. The garden looked much better in one afternoon.'
  },
  {
    id: 2,
    author: 'Paolo N.',
    date: '14 Mar 2026',
    rating: 4,
    job: 'Small moving support',
    text: 'Reliable and careful with boxes and tools. Would book again for similar help.'
  },
  {
    id: 3,
    author: 'Sara V.',
    date: '10 Mar 2026',
    rating: 5,
    job: 'Lawn care',
    text: 'Fast and accurate, arrived on time and left everything clean and organized.'
  }
]

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
        <p className="dashboard-section-subtitle">Latest updates with key details at a glance.</p>

        <div className="activity-list" role="list">
          {recentActivities.map((activity) => (
            <article key={activity.id} className="activity-item" role="listitem">
              <div className="activity-main">
                <h3>{activity.job}</h3>
                <span className={`activity-status activity-status-${activity.status.toLowerCase().replace(' ', '-')}`}>
                  {activity.status}
                </span>
              </div>

              <dl className="activity-meta">
                <div>
                  <dt>Place</dt>
                  <dd>{activity.place}</dd>
                </div>
                <div>
                  <dt>Date</dt>
                  <dd>{activity.date}</dd>
                </div>
                <div>
                  <dt>Time</dt>
                  <dd>{activity.time}</dd>
                </div>
                <div>
                  <dt>Client</dt>
                  <dd>{activity.client}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section className="dashboard-reviews">
        <h2>Reviews</h2>
        <p className="dashboard-section-subtitle">What clients said after recent jobs.</p>

        <div className="review-list" role="list">
          {reviews.map((review) => (
            <article key={review.id} className="review-item" role="listitem">
              <div className="review-top">
                <h3>{review.author}</h3>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-job">Job: {review.job}</p>
              <p className="review-rating" aria-label={`Rating ${review.rating} out of 5`}>
                {'★'.repeat(review.rating)}
                {'☆'.repeat(5 - review.rating)}
              </p>
              <p className="review-text">{review.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Dashboard
