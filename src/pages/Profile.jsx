import { useEffect, useState } from 'react'
import './Profile.css'

const DEFAULT_AVATAR =
  'https://images.pexels.com/photos/7841672/pexels-photo-7841672.jpeg?auto=compress&cs=tinysrgb&w=300'

function Profile({ user, onUserUpdate }) {
  const [selectedAvatar, setSelectedAvatar] = useState(
    user?.profileImage || DEFAULT_AVATAR
  )

  useEffect(() => {
    setSelectedAvatar(user?.profileImage || DEFAULT_AVATAR)
  }, [user?.profileImage])

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setSelectedAvatar(reader.result)
        onUserUpdate?.({ profileImage: reader.result })
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar-wrapper">
            <label htmlFor="profile-image-upload" className="profile-avatar-trigger">
              <img className="profile-avatar" src={selectedAvatar} alt="Selected profile" />
              <span className="profile-avatar-overlay">Change photo</span>
            </label>
            <input
              id="profile-image-upload"
              className="profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
            />
          </div>

          <div>
            <h1>{user?.name || 'TaskUp User'}</h1>
            <p>{user?.email || 'user@taskup.local'}</p>
          </div>
        </div>

        <article className="profile-info-block personal-info-block">
          <h3>Personal Infos</h3>
          <div className="personal-info-grid">
            <p><strong>Age:</strong> 19 years old</p>
            <p><strong>Status:</strong> University student</p>
            <p><strong>City:</strong> Bologna</p>
            <p><strong>Languages:</strong> Italian, English</p>
            <p><strong>Transport:</strong> Bike / public transport</p>
            <p><strong>Preferred jobs:</strong> Gardening, outdoor support</p>
          </div>
        </article>

        <div className="profile-grid">
          <article className="profile-info-block">
            <h3>Short Bio</h3>
            <p>
              Motivated young worker available for gardening, outdoor support and practical local jobs.
            </p>
          </article>

          <article className="profile-info-block">
            <h3>Main Skills</h3>
            <div className="skill-list">
              <span>Garden cleanup</span>
              <span>Lawn care</span>
              <span>Small moving</span>
              <span>Tool organization</span>
            </div>
          </article>

          <article className="profile-info-block">
            <h3>Work Area</h3>
            <p>Bologna and nearby neighborhoods (up to 10 km).</p>
          </article>

          <article className="profile-info-block">
            <h3>Availability</h3>
            <p>Afternoons on weekdays and all day during weekends.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Profile
