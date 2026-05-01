import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ name: '', email: '', password: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.name.trim())               e.name     = 'Name is required'
    if (!form.email.includes('@'))       e.email    = 'Enter a valid email'
    if (form.password.length < 6)        e.password = 'Password must be 6+ characters'
    if (!form.phone.match(/^\d{10}$/))   e.phone    = 'Enter valid 10-digit phone'
    return e
  }

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setLoading(true)
    setTimeout(() => {
      alert('✅ Registered! Use patient@test.com / 123456 to login for demo.')
      navigate('/login')
    }, 600)
  }

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👤</div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Create Account</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Register as a patient</p>
          </div>

          <form onSubmit={handleSubmit}>
            {[
              { field: 'name',     label: 'Full Name',     type: 'text',     placeholder: 'Rahul Sharma' },
              { field: 'email',    label: 'Email',         type: 'email',    placeholder: 'rahul@gmail.com' },
              { field: 'phone',    label: 'Phone Number',  type: 'text',     placeholder: '9876543210' },
              { field: 'password', label: 'Password',      type: 'password', placeholder: 'Min 6 characters' },
            ].map(({ field, label, type, placeholder }) => (
              <div className="form-group" key={field}>
                <label className="form-label">{label}</label>
                <input className="form-input" type={type} placeholder={placeholder} value={form[field]} onChange={e => handleChange(field, e.target.value)} />
                {errors[field] && <p className="form-error">{errors[field]}</p>}
              </div>
            ))}
            <button type="submit" className="btn btn-blue btn-block" disabled={loading}>
              {loading ? '⏳ Creating...' : 'Create Account'}
            </button>
          </form>

          <div className="divider" />
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            Already registered? <Link to="/login" style={{ color: '#2563eb', fontWeight: 600 }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}