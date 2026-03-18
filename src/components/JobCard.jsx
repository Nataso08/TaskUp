import './JobCard.css';

function JobCard({
  name,
  role,
  area,
  presentation,
  rating,
  reviews,
  profileImage
}) {
  return (
    <article className="job-card">
      <div className="job-card-left">
        <img className="worker-image" src={profileImage} alt={`${name} profile`} />
      </div>

      <div className="job-card-right">
        <div className="job-card-header">
          <div className="worker-main-info">
            <h3>{name}</h3>
            <p className="worker-role">{role}</p>
          </div>

          <div className="worker-rating" title={`${rating} out of 10`}>
            {rating}
          </div>
        </div>

        <div className="job-card-content">
          <p className="worker-presentation">{presentation}</p>
          <p className="worker-area">📍 Works in: {area}</p>
          <p className="worker-reviews">{reviews} reviews</p>
        </div>

        <button type="button" className="job-action-button">
          View profile
        </button>
      </div>
    </article>
  );
}

export default JobCard;
