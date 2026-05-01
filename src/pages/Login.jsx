import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  function fillDemo(role) {
    if (role === 'patient') { setEmail('patient@test.com'); setPassword('123456') }
    if (role === 'doctor')  { setEmail('doctor@test.com');  setPassword('123456') }
    if (role === 'admin')   { setEmail('admin@test.com');   setPassword('123456') }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please fill all fields'); return }
    setLoading(true); setError('')
    setTimeout(() => {
      const result = login(email, password)
      if (result.success) navigate('/')
      else { setError(result.message); setLoading(false) }
    }, 600)
  }

  return (
    <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div className="card" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏥</div>
            <h2 style={{ fontWeight: 800, fontSize: '1.5rem' }}>Welcome Back</h2>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Login to your account</p>
          </div>

          {/* Demo Buttons */}
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '0.5rem', textAlign: 'center' }}>Quick demo login:</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['patient', 'doctor', 'admin'].map(role => (
                <button key={role} className="btn btn-gray" style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem', textTransform: 'capitalize' }} onClick={() => fillDemo(role)}>{role}</button>
              ))}
            </div>
          </div>

          {error && <div className="alert alert-red">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-blue btn-block" disabled={loading}>
              {loading ? '⏳ Logging in...' : 'Login'}
            </button>
          </form>

          <div className="divider" />
          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6b7280' }}>
            No account? <Link to="/register" style={{ color: '#2563eb', fontWeight: 600 }}>Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}