import { useEffect, useState } from 'react'
import './Profile.css'

const DEFAULT_AVATAR =
  'https://images.pexels.com/photos/7841672/pexels-photo-7841672.jpeg?auto=compress&cs=tinysrgb&w=300'
const DEFAULT_PERSONAL_INFO = {
  age: '19 years old',
  status: 'University student',
  city: 'Bologna',
  languages: 'Italian, English',
  transport: 'Bike / public transport',
  preferredJobs: 'Gardening, outdoor support'
}
const DEFAULT_BIO =
  'Motivated young worker available for gardening, outdoor support and practical local jobs.'
const DEFAULT_SKILLS = [
  'Garden cleanup',
  'Lawn care',
  'Small moving',
  'Tool organization'
]
const DEFAULT_WORK_AREA_TEXT = 'Bologna and nearby neighborhoods (up to 10 km).'
const DEFAULT_WORK_AREA_MAP_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=11.215%2C44.445%2C11.42%2C44.56&layer=mapnik'
const DEFAULT_AVAILABILITY = [
  { day: 'Mon - Fri', time: '14:00 - 20:00' },
  { day: 'Saturday', time: '09:00 - 19:00' },
  { day: 'Sunday', time: '10:00 - 18:00' }
]

function GearIcon() {
  return (
    <svg
      className="section-edit-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M9.6 3.6h4.8l.5 2.2c.5.2 1 .4 1.4.8l2.2-.7 2.4 4.2-1.8 1.4c.1.5.1 1 .1 1.5s0 1-.1 1.5l1.8 1.4-2.4 4.2-2.2-.7c-.4.3-.9.6-1.4.8l-.5 2.2H9.6l-.5-2.2c-.5-.2-1-.4-1.4-.8l-2.2.7-2.4-4.2 1.8-1.4a8 8 0 0 1 0-3l-1.8-1.4 2.4-4.2 2.2.7c.4-.3.9-.6 1.4-.8l.5-2.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  )
}

function Profile({ user, onUserUpdate }) {
  const [selectedAvatar, setSelectedAvatar] = useState(
    user?.profileImage || DEFAULT_AVATAR
  )
  const [personalInfo, setPersonalInfo] = useState({
    ...DEFAULT_PERSONAL_INFO,
    ...(user?.personalInfo || {})
  })
  const [bio, setBio] = useState(user?.bio || DEFAULT_BIO)
  const [skills, setSkills] = useState(
    Array.isArray(user?.skills) && user.skills.length > 0 ? user.skills : DEFAULT_SKILLS
  )
  const [workAreaText, setWorkAreaText] = useState(
    user?.workAreaText || DEFAULT_WORK_AREA_TEXT
  )
  const [workAreaMapUrl, setWorkAreaMapUrl] = useState(
    user?.workAreaMapUrl || DEFAULT_WORK_AREA_MAP_URL
  )
  const [availability, setAvailability] = useState(
    Array.isArray(user?.availability) && user.availability.length > 0
      ? user.availability
      : DEFAULT_AVAILABILITY
  )

  const [isPersonalInfoModalOpen, setIsPersonalInfoModalOpen] = useState(false)
  const [personalInfoDraft, setPersonalInfoDraft] = useState(DEFAULT_PERSONAL_INFO)
  const [isBioModalOpen, setIsBioModalOpen] = useState(false)
  const [bioDraft, setBioDraft] = useState('')
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false)
  const [skillsDraft, setSkillsDraft] = useState('')
  const [isWorkAreaModalOpen, setIsWorkAreaModalOpen] = useState(false)
  const [workAreaTextDraft, setWorkAreaTextDraft] = useState('')
  const [workAreaMapUrlDraft, setWorkAreaMapUrlDraft] = useState('')
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [availabilityDraft, setAvailabilityDraft] = useState({
    weekdays: DEFAULT_AVAILABILITY[0].time,
    saturday: DEFAULT_AVAILABILITY[1].time,
    sunday: DEFAULT_AVAILABILITY[2].time
  })

  useEffect(() => {
    setSelectedAvatar(user?.profileImage || DEFAULT_AVATAR)
  }, [user?.profileImage])

  useEffect(() => {
    setPersonalInfo({
      ...DEFAULT_PERSONAL_INFO,
      ...(user?.personalInfo || {})
    })
  }, [user?.personalInfo])

  useEffect(() => {
    setBio(user?.bio || DEFAULT_BIO)
  }, [user?.bio])

  useEffect(() => {
    if (Array.isArray(user?.skills) && user.skills.length > 0) {
      setSkills(user.skills)
    } else {
      setSkills(DEFAULT_SKILLS)
    }
  }, [user?.skills])

  useEffect(() => {
    setWorkAreaText(user?.workAreaText || DEFAULT_WORK_AREA_TEXT)
  }, [user?.workAreaText])

  useEffect(() => {
    if (Array.isArray(user?.availability) && user.availability.length > 0) {
      setAvailability(user.availability)
    } else {
      setAvailability(DEFAULT_AVAILABILITY)
    }
  }, [user?.availability])

  useEffect(() => {
    setWorkAreaMapUrl(user?.workAreaMapUrl || DEFAULT_WORK_AREA_MAP_URL)
  }, [user?.workAreaMapUrl])

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

  const openSkillsModal = () => {
    setSkillsDraft(skills.join(', '))
    setIsSkillsModalOpen(true)
  }

  const closeSkillsModal = () => {
    setIsSkillsModalOpen(false)
  }

  const handleSaveSkills = () => {
    const updatedSkills = skillsDraft
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    if (updatedSkills.length === 0) {
      return
    }

    setSkills(updatedSkills)
    onUserUpdate?.({ skills: updatedSkills })
    closeSkillsModal()
  }

  const openPersonalInfoModal = () => {
    setPersonalInfoDraft(personalInfo)
    setIsPersonalInfoModalOpen(true)
  }

  const closePersonalInfoModal = () => {
    setIsPersonalInfoModalOpen(false)
  }

  const handleSavePersonalInfo = () => {
    setPersonalInfo(personalInfoDraft)
    onUserUpdate?.({ personalInfo: personalInfoDraft })
    closePersonalInfoModal()
  }

  const openBioModal = () => {
    setBioDraft(bio)
    setIsBioModalOpen(true)
  }

  const closeBioModal = () => {
    setIsBioModalOpen(false)
  }

  const handleSaveBio = () => {
    const updatedBio = bioDraft.trim()
    if (!updatedBio) {
      return
    }

    setBio(updatedBio)
    onUserUpdate?.({ bio: updatedBio })
    closeBioModal()
  }

  const openWorkAreaModal = () => {
    setWorkAreaTextDraft(workAreaText)
    setWorkAreaMapUrlDraft(workAreaMapUrl)
    setIsWorkAreaModalOpen(true)
  }

  const closeWorkAreaModal = () => {
    setIsWorkAreaModalOpen(false)
  }

  const handleSaveWorkArea = () => {
    const updatedText = workAreaTextDraft.trim()
    const updatedMapUrl = workAreaMapUrlDraft.trim()

    if (!updatedText || !updatedMapUrl) {
      return
    }

    setWorkAreaText(updatedText)
    setWorkAreaMapUrl(updatedMapUrl)
    onUserUpdate?.({ workAreaText: updatedText, workAreaMapUrl: updatedMapUrl })
    closeWorkAreaModal()
  }

  const openAvailabilityModal = () => {
    setAvailabilityDraft({
      weekdays: availability[0]?.time || DEFAULT_AVAILABILITY[0].time,
      saturday: availability[1]?.time || DEFAULT_AVAILABILITY[1].time,
      sunday: availability[2]?.time || DEFAULT_AVAILABILITY[2].time
    })
    setIsAvailabilityModalOpen(true)
  }

  const closeAvailabilityModal = () => {
    setIsAvailabilityModalOpen(false)
  }

  const handleSaveAvailability = () => {
    const updatedAvailability = [
      { day: 'Mon - Fri', time: availabilityDraft.weekdays.trim() },
      { day: 'Saturday', time: availabilityDraft.saturday.trim() },
      { day: 'Sunday', time: availabilityDraft.sunday.trim() }
    ]

    if (updatedAvailability.some((slot) => !slot.time)) {
      return
    }

    setAvailability(updatedAvailability)
    onUserUpdate?.({ availability: updatedAvailability })
    closeAvailabilityModal()
  }

  const personalInfoRows = [
    { label: 'Age', value: personalInfo.age },
    { label: 'Status', value: personalInfo.status },
    { label: 'City', value: personalInfo.city },
    { label: 'Languages', value: personalInfo.languages },
    { label: 'Transport', value: personalInfo.transport },
    { label: 'Preferred jobs', value: personalInfo.preferredJobs }
  ]

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
          <div className="section-header">
            <h3>Personal Infos</h3>
            <button
              type="button"
              className="section-edit-button"
              onClick={openPersonalInfoModal}
              aria-label="Modifica Personal Infos"
              title="Modifica Personal Infos"
            >
              <GearIcon />
            </button>
          </div>
          <div className="personal-info-grid">
            {personalInfoRows.map((item) => (
              <p key={item.label}><strong>{item.label}:</strong> {item.value}</p>
            ))}
          </div>
        </article>

        <article className="profile-info-block bio-block">
          <div className="section-header">
            <h3>Short Bio</h3>
            <button
              type="button"
              className="section-edit-button"
              onClick={openBioModal}
              aria-label="Modifica Short Bio"
              title="Modifica Short Bio"
            >
              <GearIcon />
            </button>
          </div>
          <p>{bio}</p>
        </article>

        <div className="profile-grid">
          <article className="profile-info-block">
            <div className="section-header">
              <h3>Main Skills</h3>
              <button
                type="button"
                className="section-edit-button"
                onClick={openSkillsModal}
                aria-label="Modifica skills"
                title="Modifica skills"
              >
                <GearIcon />
              </button>
            </div>
            <div className="skill-list">
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>

          <article className="profile-info-block">
            <div className="section-header">
              <h3>Work Area</h3>
              <button
                type="button"
                className="section-edit-button"
                onClick={openWorkAreaModal}
                aria-label="Modifica Work Area"
                title="Modifica Work Area"
              >
                <GearIcon />
              </button>
            </div>
            <p className="work-area-text">{workAreaText}</p>
            <div className="work-area-map" aria-label="Map of work area">
              <iframe
                title="Work area map"
                loading="lazy"
                src={workAreaMapUrl}
              />
              <div className="work-area-overlay" aria-hidden="true">
                <div className="work-area-circle">
                  <span className="work-area-dot" />
                </div>
              </div>
            </div>
          </article>

          <article className="profile-info-block availability-block">
            <div className="section-header">
              <h3>Availability</h3>
              <button
                type="button"
                className="section-edit-button"
                onClick={openAvailabilityModal}
                aria-label="Modifica Availability"
                title="Modifica Availability"
              >
                <GearIcon />
              </button>
            </div>
            <table className="availability-table">
              <tbody>
                {availability.map((slot, index) => (
                  <tr key={`${slot.day}-${index}`}>
                    <th scope="row">{slot.day}</th>
                    <td>{slot.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        </div>
      </section>

      {isPersonalInfoModalOpen && (
        <div
          className="profile-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closePersonalInfoModal()
            }
          }}
        >
          <div className="profile-modal" role="dialog" aria-modal="true" aria-label="Modifica Personal Infos">
            <h4>Modifica Personal Infos</h4>
            <div className="profile-modal-grid">
              <label className="profile-modal-field">
                <span>Age</span>
                <input
                  className="profile-modal-input"
                  value={personalInfoDraft.age}
                  onChange={(event) =>
                    setPersonalInfoDraft((prev) => ({ ...prev, age: event.target.value }))
                  }
                />
              </label>
              <label className="profile-modal-field">
                <span>Status</span>
                <input
                  className="profile-modal-input"
                  value={personalInfoDraft.status}
                  onChange={(event) =>
                    setPersonalInfoDraft((prev) => ({ ...prev, status: event.target.value }))
                  }
                />
              </label>
              <label className="profile-modal-field">
                <span>City</span>
                <input
                  className="profile-modal-input"
                  value={personalInfoDraft.city}
                  onChange={(event) =>
                    setPersonalInfoDraft((prev) => ({ ...prev, city: event.target.value }))
                  }
                />
              </label>
              <label className="profile-modal-field">
                <span>Languages</span>
                <input
                  className="profile-modal-input"
                  value={personalInfoDraft.languages}
                  onChange={(event) =>
                    setPersonalInfoDraft((prev) => ({ ...prev, languages: event.target.value }))
                  }
                />
              </label>
              <label className="profile-modal-field">
                <span>Transport</span>
                <input
                  className="profile-modal-input"
                  value={personalInfoDraft.transport}
                  onChange={(event) =>
                    setPersonalInfoDraft((prev) => ({ ...prev, transport: event.target.value }))
                  }
                />
              </label>
              <label className="profile-modal-field">
                <span>Preferred jobs</span>
                <input
                  className="profile-modal-input"
                  value={personalInfoDraft.preferredJobs}
                  onChange={(event) =>
                    setPersonalInfoDraft((prev) => ({ ...prev, preferredJobs: event.target.value }))
                  }
                />
              </label>
            </div>
            <div className="profile-modal-actions">
              <button
                type="button"
                className="profile-modal-cancel-button"
                onClick={closePersonalInfoModal}
              >
                Annulla
              </button>
              <button
                type="button"
                className="profile-modal-save-button"
                onClick={handleSavePersonalInfo}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      )}

      {isBioModalOpen && (
        <div
          className="profile-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeBioModal()
            }
          }}
        >
          <div className="profile-modal" role="dialog" aria-modal="true" aria-label="Modifica Short Bio">
            <h4>Modifica Short Bio</h4>
            <div className="profile-modal-form">
              <textarea
                className="profile-modal-input"
                value={bioDraft}
                onChange={(event) => setBioDraft(event.target.value)}
                rows={6}
              />
            </div>
            <div className="profile-modal-actions">
              <button type="button" className="profile-modal-cancel-button" onClick={closeBioModal}>
                Annulla
              </button>
              <button type="button" className="profile-modal-save-button" onClick={handleSaveBio}>
                Salva
              </button>
            </div>
          </div>
        </div>
      )}

      {isSkillsModalOpen && (
        <div
          className="profile-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeSkillsModal()
            }
          }}
        >
          <div className="profile-modal" role="dialog" aria-modal="true" aria-label="Modifica skills">
            <h4>Modifica skills</h4>
            <p>Inserisci le skills separate da virgola.</p>
            <div className="profile-modal-form">
              <textarea
                className="profile-modal-input"
                value={skillsDraft}
                onChange={(event) => setSkillsDraft(event.target.value)}
                rows={5}
              />
            </div>
            <div className="profile-modal-actions">
              <button type="button" className="profile-modal-cancel-button" onClick={closeSkillsModal}>
                Annulla
              </button>
              <button type="button" className="profile-modal-save-button" onClick={handleSaveSkills}>
                Salva
              </button>
            </div>
          </div>
        </div>
      )}

      {isWorkAreaModalOpen && (
        <div
          className="profile-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeWorkAreaModal()
            }
          }}
        >
          <div className="profile-modal" role="dialog" aria-modal="true" aria-label="Modifica Work Area">
            <h4>Modifica Work Area</h4>
            <div className="profile-modal-form">
              <label className="profile-modal-field">
                <span>Descrizione area</span>
                <textarea
                  className="profile-modal-input"
                  value={workAreaTextDraft}
                  onChange={(event) => setWorkAreaTextDraft(event.target.value)}
                  rows={3}
                />
              </label>
              <label className="profile-modal-field">
                <span>URL mappa embed</span>
                <input
                  className="profile-modal-input"
                  value={workAreaMapUrlDraft}
                  onChange={(event) => setWorkAreaMapUrlDraft(event.target.value)}
                />
              </label>
            </div>
            <div className="profile-modal-actions">
              <button
                type="button"
                className="profile-modal-cancel-button"
                onClick={closeWorkAreaModal}
              >
                Annulla
              </button>
              <button
                type="button"
                className="profile-modal-save-button"
                onClick={handleSaveWorkArea}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      )}

      {isAvailabilityModalOpen && (
        <div
          className="profile-modal-backdrop"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeAvailabilityModal()
            }
          }}
        >
          <div className="profile-modal" role="dialog" aria-modal="true" aria-label="Modifica Availability">
            <h4>Modifica Availability</h4>
            <div className="profile-modal-form">
              <label className="profile-modal-field">
                <span>Mon - Fri</span>
                <input
                  className="profile-modal-input"
                  value={availabilityDraft.weekdays}
                  onChange={(event) =>
                    setAvailabilityDraft((prev) => ({ ...prev, weekdays: event.target.value }))
                  }
                />
              </label>
              <label className="profile-modal-field">
                <span>Saturday</span>
                <input
                  className="profile-modal-input"
                  value={availabilityDraft.saturday}
                  onChange={(event) =>
                    setAvailabilityDraft((prev) => ({ ...prev, saturday: event.target.value }))
                  }
                />
              </label>
              <label className="profile-modal-field">
                <span>Sunday</span>
                <input
                  className="profile-modal-input"
                  value={availabilityDraft.sunday}
                  onChange={(event) =>
                    setAvailabilityDraft((prev) => ({ ...prev, sunday: event.target.value }))
                  }
                />
              </label>
            </div>
            <div className="profile-modal-actions">
              <button
                type="button"
                className="profile-modal-cancel-button"
                onClick={closeAvailabilityModal}
              >
                Annulla
              </button>
              <button
                type="button"
                className="profile-modal-save-button"
                onClick={handleSaveAvailability}
              >
                Salva
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Profile
