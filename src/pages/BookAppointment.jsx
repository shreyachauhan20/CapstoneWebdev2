import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { DOCTORS, TIME_SLOTS } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function BookAppointment() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, bookAppointment } = useApp()
  const doctor = DOCTORS.find(d => d.id === Number(id))

  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')
  const [booked, setBooked] = useState(false)

  if (!doctor) return <div className="container page"><p>Doctor not found.</p></div>

  const today = new Date().toISOString().split('T')[0]

  function handleStep1() {
    if (!selectedDate) { setError('Please select a date'); return }
    setError(''); setStep(2)
  }

  function handleStep2() {
    if (!selectedSlot) { setError('Please select a time slot'); return }
    setError(''); setStep(3)
  }

  function handleConfirm() {
    if (!user) { navigate('/login'); return }
    bookAppointment({ doctorName: doctor.name, specialization: doctor.specialization, date: selectedDate, time: selectedSlot, fees: doctor.fees, notes: reason })
    setBooked(true)
  }

  if (booked) {
    return (
      <div className="page">
        <div className="container" style={{ maxWidth: 480, textAlign: 'center' }}>
          <div className="card" style={{ padding: '3rem 2rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Appointment Booked!</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              With <strong>{doctor.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>
            </p>
            <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#059669', marginBottom: '1.5rem' }}>Fees: ₹{doctor.fees}</p>
            <button className="btn btn-blue btn-block" onClick={() => navigate('/dashboard')}>View My Appointments</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <div className="container" style={{ maxWidth: 540 }}>

        {/* Doctor Header */}
        <div className="card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ fontSize: '2.5rem', width: 56, height: 56, background: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{doctor.img}</div>
          <div>
            <p style={{ fontWeight: 700 }}>{doctor.name}</p>
            <p style={{ color: '#2563eb', fontSize: '0.875rem' }}>{doctor.specialization} • ₹{doctor.fees}</p>
            <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>📍 {doctor.hospital}, {doctor.location}</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.75rem' }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.875rem', background: step >= s ? '#2563eb' : '#e5e7eb', color: step >= s ? 'white' : '#9ca3af', flexShrink: 0, transition: 'all 0.2s' }}>
                {step > s ? '✓' : s}
              </div>
              {i < 2 && <div style={{ flex: 1, height: 2, background: step > s ? '#2563eb' : '#e5e7eb', margin: '0 0.5rem', transition: 'all 0.2s' }} />}
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>📅 Select a Date</h3>
            {error && <div className="alert alert-red">{error}</div>}
            <div className="form-group">
              <label className="form-label">Appointment Date</label>
              <input type="date" className="form-input" min={today} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </div>
            <button className="btn btn-blue btn-block" onClick={handleStep1}>Next →</button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>⏰ Choose a Time Slot</h3>
            <p style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1.25rem' }}>Date: {selectedDate}</p>
            {error && <div className="alert alert-red">{error}</div>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {TIME_SLOTS.map(slot => (
                <button key={slot} className={`slot-btn ${selectedSlot === slot ? 'selected' : ''}`} onClick={() => setSelectedSlot(slot)}>{slot}</button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-gray" onClick={() => setStep(1)} style={{ flex: 1 }}>← Back</button>
              <button className="btn btn-blue" onClick={handleStep2} style={{ flex: 2 }}>Next →</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="card">
            <h3 style={{ fontWeight: 700, marginBottom: '1.25rem' }}>✅ Confirm Appointment</h3>
            <div style={{ background: '#f8fafc', borderRadius: 8, padding: '1rem', marginBottom: '1.25rem', fontSize: '0.875rem' }}>
              {[['Doctor', doctor.name], ['Date', selectedDate], ['Time', selectedSlot], ['Fees', `₹${doctor.fees}`]].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#6b7280' }}>{label}</span>
                  <span style={{ fontWeight: 600 }}>{val}</span>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label className="form-label">Reason (optional)</label>
              <textarea className="form-input" rows={3} placeholder="Describe your symptoms..." value={reason} onChange={e => setReason(e.target.value)} style={{ resize: 'none' }} />
            </div>
            {!user && <div className="alert alert-blue">Please <a href="/login" style={{ color: '#2563eb', fontWeight: 600 }}>login</a> to confirm.</div>}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-gray" onClick={() => setStep(2)} style={{ flex: 1 }}>← Back</button>
              <button className="btn btn-blue" onClick={handleConfirm} style={{ flex: 2 }}>{user ? 'Confirm Booking ✓' : 'Login to Book'}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}