import { Link } from 'react-router-dom'

export default function DoctorCard({ doctor }) {
  return (
    <div className="card"
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
      style={{ transition: 'all 0.2s' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ fontSize: '2.5rem', width: 58, height: 58, background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {doctor.img}
        </div>
        <div>
          <p style={{ fontWeight: 700, fontSize: '1rem' }}>{doctor.name}</p>
          <p style={{ color: '#2563eb', fontSize: '0.85rem', fontWeight: 500 }}>{doctor.specialization}</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', fontSize: '0.85rem', color: '#6b7280' }}>
        <span>🏥 {doctor.hospital}</span>
        <span>📍 {doctor.location}</span>
        <span>⏱ {doctor.experience} years experience</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span className="stars">{'★'.repeat(Math.floor(doctor.rating))} <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{doctor.rating}</span></span>
        <span style={{ fontWeight: 700, color: '#059669' }}>₹{doctor.fees}</span>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <span className={doctor.available ? 'badge badge-green' : 'badge badge-red'}>
          {doctor.available ? '✅ Available' : '❌ Not Available'}
        </span>
      </div>

      <Link to={`/book/${doctor.id}`}>
        <button className="btn btn-blue btn-block" disabled={!doctor.available}>
          {doctor.available ? 'Book Appointment' : 'Not Available'}
        </button>
      </Link>
    </div>
  )
}