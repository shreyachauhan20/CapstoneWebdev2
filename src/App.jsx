import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import BookAppointment from './pages/BookAppointment'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/doctors"   element={<Doctors />} />
          <Route path="/book/:id"  element={<BookAppointment />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/register"  element={<Register />} />
          <Route path="/admin"     element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}