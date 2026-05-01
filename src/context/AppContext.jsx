import { createContext, useContext, useState } from 'react'
import { SAMPLE_APPOINTMENTS } from '../data/mockData'

const AppContext = createContext()

const USERS = [
  { id: 1, name: 'Rahul Sharma', email: 'patient@test.com', password: '123456', role: 'patient' },
  { id: 2, name: 'Dr. Priya Patel', email: 'doctor@test.com', password: '123456', role: 'doctor' },
  { id: 3, name: 'Admin User', email: 'admin@test.com', password: '123456', role: 'admin' },
]

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  const [darkMode, setDarkMode] = useState(false)
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS)

  function login(email, password) {
    const found = USERS.find(u => u.email === email && u.password === password)
    if (found) {
      setUser(found)
      localStorage.setItem('user', JSON.stringify(found))
      return { success: true }
    }
    return { success: false, message: 'Wrong email or password!' }
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  function toggleDark() {
    setDarkMode(prev => {
      const next = !prev
      document.body.classList.toggle('dark', next)
      return next
    })
  }

  function bookAppointment(data) {
    const newAppt = { id: Date.now(), status: 'upcoming', ...data }
    setAppointments(prev => [...prev, newAppt])
  }

  function cancelAppointment(id) {
    setAppointments(prev =>
      prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a)
    )
  }

  return (
    <AppContext.Provider value={{
      user, login, logout,
      darkMode, toggleDark,
      appointments, bookAppointment, cancelAppointment,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}