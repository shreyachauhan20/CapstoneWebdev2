import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { user, logout, darkMode, toggleDark } = useApp()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🏥 HealthCare+
      </Link>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/doctors">Find Doctors</Link></li>

        {user && user.role === 'patient' && (
          <li><Link to="/dashboard">My Appointments</Link></li>
        )}
        {user && user.role === 'doctor' && (
          <li><Link to="/dashboard">My Dashboard</Link></li>
        )}
        {user && user.role === 'admin' && (
          <li><Link to="/admin">Admin Panel</Link></li>
        )}

        <li>
          <button onClick={toggleDark} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.4rem 0.75rem', borderRadius: 6, cursor: 'pointer', fontSize: '1rem' }}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </li>

        {user ? (
          <>
            <li style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.875rem' }}>
              👤 {user.name.split(' ')[0]}
            </li>
            <li>
              <button onClick={handleLogout} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '0.4rem 0.9rem', borderRadius: 6, cursor: 'pointer', fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.875rem' }}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <button style={{ background: 'white', border: 'none', color: '#2563eb', padding: '0.4rem 1rem', borderRadius: 6, cursor: 'pointer', fontFamily: 'Poppins', fontWeight: 600, fontSize: '0.875rem' }}>
                Login
              </button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}