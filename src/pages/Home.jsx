import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SPECIALIZATIONS, DOCTORS } from '../data/mockData'

export default function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/doctors?search=${search}`)
  }

  const topDoctors = DOCTORS.filter(d => d.rating >= 4.7).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1d4ed8, #0ea5e9)', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Find a Doctor,<br />Book an Appointment
          </h1>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.9 }}>
            Connect with the best doctors near you. Fast, simple and reliable.
          </p>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.75rem', maxWidth: 520, margin: '0 auto' }}>
            <input
              className="form-input"
              placeholder="Search doctor or specialization..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-white">🔍 Search</button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <div className="grid-4">
          {[
            { icon: '👨‍⚕️', value: '50+',  label: 'Expert Doctors',      color: '#2563eb' },
            { icon: '📅', value: '1200+', label: 'Appointments Done',   color: '#059669' },
            { icon: '⭐', value: '4.8',   label: 'Average Rating',      color: '#d97706' },
            { icon: '🏥', value: '10+',   label: 'Specializations',     color: '#7c3aed' },
          ].map(s => (
            <div key={s.label} className="stat-card" style={{ textAlign: 'center' }}>
              <div className="stat-icon">{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Specializations */}
      <div className="container" style={{ marginTop: '3rem' }}>
        <h2 className="section-title">Browse by Specialization</h2>
        <p className="section-sub">Find the right specialist for your needs</p>
        <div className="grid-4">
          {SPECIALIZATIONS.map(spec => (
            <Link to={`/doctors?specialization=${spec}`} key={spec}>
              <div className="card" style={{ textAlign: 'center', cursor: 'pointer', padding: '1.25rem', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#2563eb'}
                onMouseLeave={e => e.currentTarget.style.borderColor = ''}
              >
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>{spec}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Doctors */}
      <div className="container" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 className="section-title">Top Rated Doctors</h2>
            <p className="section-sub" style={{ margin: 0 }}>Highly rated by our patients</p>
          </div>
          <Link to="/doctors"><button className="btn btn-white">View All →</button></Link>
        </div>
        <div className="grid-3">
          {topDoctors.map(doctor => (
            <div key={doctor.id} className="card" style={{ transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '2rem', width: 50, height: 50, background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{doctor.img}</div>
                <div>
                  <p style={{ fontWeight: 700 }}>{doctor.name}</p>
                  <p style={{ color: '#2563eb', fontSize: '0.85rem' }}>{doctor.specialization}</p>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '0.75rem' }}>📍 {doctor.location} • {doctor.experience} yrs exp</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="stars">★ {doctor.rating}</span>
                <span style={{ fontWeight: 700, color: '#059669' }}>₹{doctor.fees}</span>
              </div>
              <Link to={`/book/${doctor.id}`} style={{ display: 'block', marginTop: '1rem' }}>
                <button className="btn btn-blue btn-block" disabled={!doctor.available}>Book Now</button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#1e293b', color: '#94a3b8', padding: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
        <p>🏥 HealthCare+ — Capstone Project | Built with React + Vite</p>
      </div>
    </div>
  )
}