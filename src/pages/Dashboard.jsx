import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, appointments, cancelAppointment } = useApp()
  const navigate = useNavigate()

  if (!user) { navigate('/login'); return null }

  // 🔑 Filter based on role
  const myAppointments = user.role === 'doctor'
    ? appointments.filter(a => a.doctorName === user.name)  // doctor sees their patients
    : appointments  // patient sees all their appointments

  const upcoming  = myAppointments.filter(a => a.status === 'upcoming').length
  const completed = myAppointments.filter(a => a.status === 'completed').length
  const cancelled = myAppointments.filter(a => a.status === 'cancelled').length

  function getBadge(status) {
    if (status === 'upcoming')  return <span className="badge badge-blue">🕐 Upcoming</span>
    if (status === 'completed') return <span className="badge badge-green">✅ Completed</span>
    if (status === 'cancelled') return <span className="badge badge-red">❌ Cancelled</span>
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">
          {user.role === 'doctor' ? '🩺' : '👋'} Hello, {user.name.split(' ')[0]}!
        </h2>
        <p className="section-sub" style={{ margin: 0 }}>
          {user.role === 'doctor' ? 'Your upcoming patient schedule' : 'Here are all your appointments'}
        </p>

        {/* Stats */}
        <div className="grid-3" style={{ margin: '2rem 0' }}>
          <div className="stat-card"><div className="stat-icon">📅</div><div className="stat-value" style={{ color: '#2563eb' }}>{upcoming}</div><div className="stat-label">Upcoming</div></div>
          <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-value" style={{ color: '#059669' }}>{completed}</div><div className="stat-label">Completed</div></div>
          <div className="stat-card"><div className="stat-icon">❌</div><div className="stat-value" style={{ color: '#dc2626' }}>{cancelled}</div><div className="stat-label">Cancelled</div></div>
        </div>

        {/* Table */}
        {myAppointments.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem' }}>📭</div>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', marginTop: '1rem' }}>No appointments yet</p>
          </div>
        ) : (
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>
              {user.role === 'doctor' ? 'Patient Schedule' : 'All Appointments'}
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    {user.role === 'doctor'
                      ? <><th>Patient</th><th>Date</th><th>Time</th><th>Status</th></>
                      : <><th>Doctor</th><th>Specialization</th><th>Date</th><th>Time</th><th>Fees</th><th>Status</th><th>Action</th></>
                    }
                  </tr>
                </thead>
                <tbody>
                  {myAppointments.map(appt => (
                    <tr key={appt.id}>
                      {user.role === 'doctor' ? (
                        <>
                          <td style={{ fontWeight: 600 }}>{appt.patientName || 'Patient'}</td>
                          <td>{appt.date}</td>
                          <td>{appt.time}</td>
                          <td>{getBadge(appt.status)}</td>
                        </>
                      ) : (
                        <>
                          <td style={{ fontWeight: 600 }}>{appt.doctorName}</td>
                          <td style={{ color: '#6b7280' }}>{appt.specialization}</td>
                          <td>{appt.date}</td>
                          <td>{appt.time}</td>
                          <td style={{ fontWeight: 600, color: '#059669' }}>₹{appt.fees}</td>
                          <td>{getBadge(appt.status)}</td>
                          <td>
                            {appt.status === 'upcoming' && (
                              <button className="btn btn-danger btn-sm" onClick={() => { if (window.confirm('Cancel?')) cancelAppointment(appt.id) }}>Cancel</button>
                            )}
                          </td>
                        </>
                      )}
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