import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { DOCTORS } from '../data/mockData'

export default function AdminPanel() {
  const { user, appointments } = useApp()
  const navigate = useNavigate()
  if (!user || user.role !== 'admin') { navigate('/login'); return null }

  const [tab, setTab]           = useState('overview')
  const [doctorList, setDoctors] = useState(DOCTORS)

  function toggleAvailability(id) {
    setDoctors(prev => prev.map(d => d.id === id ? { ...d, available: !d.available } : d))
  }

  function removeDoctor(id) {
    if (window.confirm('Remove this doctor?')) setDoctors(prev => prev.filter(d => d.id !== id))
  }

  const tabs = ['overview', 'doctors', 'appointments']

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">⚙️ Admin Panel</h2>
        <p className="section-sub" style={{ margin: 0 }}>Manage doctors and appointments</p>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', margin: '1.5rem 0', borderBottom: '2px solid #e5e7eb' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '0.6rem 1.25rem', border: 'none', borderBottom: tab === t ? '2px solid #2563eb' : '2px solid transparent', marginBottom: -2, background: 'transparent', fontFamily: 'Poppins', fontWeight: tab === t ? 700 : 500, color: tab === t ? '#2563eb' : '#6b7280', cursor: 'pointer', textTransform: 'capitalize', fontSize: '0.9rem' }}>
              {t === 'overview' ? '📊 Overview' : t === 'doctors' ? '👨‍⚕️ Doctors' : '📅 Appointments'}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div>
            <div className="grid-4" style={{ marginBottom: '2rem' }}>
              {[
                { icon: '👨‍⚕️', val: doctorList.length, label: 'Total Doctors', color: '#2563eb' },
                { icon: '📅', val: appointments.length, label: 'Total Appointments', color: '#7c3aed' },
                { icon: '⏳', val: appointments.filter(a => a.status === 'upcoming').length, label: 'Upcoming', color: '#d97706' },
                { icon: '✅', val: appointments.filter(a => a.status === 'completed').length, label: 'Completed', color: '#059669' },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-icon">{s.icon}</div>
                  <div className="stat-value" style={{ color: s.color }}>{s.val}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctors */}
        {tab === 'doctors' && (
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>All Doctors ({doctorList.length})</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead><tr><th>Name</th><th>Specialization</th><th>Location</th><th>Fees</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {doctorList.map(d => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 600 }}>{d.img} {d.name}</td>
                      <td>{d.specialization}</td>
                      <td>{d.location}</td>
                      <td style={{ color: '#059669', fontWeight: 600 }}>₹{d.fees}</td>
                      <td>
                        <button className={`badge ${d.available ? 'badge-green' : 'badge-red'}`} style={{ cursor: 'pointer', border: 'none', fontFamily: 'Poppins' }} onClick={() => toggleAvailability(d.id)}>
                          {d.available ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                      <td><button className="btn btn-red btn-sm" onClick={() => removeDoctor(d.id)}>Remove</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments */}
        {tab === 'appointments' && (
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>All Appointments</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead><tr><th>Doctor</th><th>Specialization</th><th>Date</th><th>Time</th><th>Fees</th><th>Status</th></tr></thead>
                <tbody>
                  {appointments.map(a => (
                    <tr key={a.id}>
                      <td style={{ fontWeight: 600 }}>{a.doctorName}</td>
                      <td>{a.specialization}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>
                      <td style={{ color: '#059669', fontWeight: 600 }}>₹{a.fees}</td>
                      <td><span className={`badge ${a.status === 'upcoming' ? 'badge-blue' : a.status === 'completed' ? 'badge-green' : 'badge-red'}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}