export const DOCTORS = [
  { id: 1,  name: 'Dr. Priya Patel',       specialization: 'Cardiologist',      experience: 12, rating: 4.8, fees: 800,  location: 'Sohna',    available: true,  hospital: 'Apollo Hospital',    img: '👩‍⚕️' },
  { id: 2,  name: 'Dr. Arjun Mehta',       specialization: 'Neurologist',       experience: 9,  rating: 4.7, fees: 1000, location: 'Delhi',     available: true,  hospital: 'Fortis Hospital',    img: '👨‍⚕️' },
  { id: 3,  name: 'Dr. Sneha Reddy',       specialization: 'Pediatrician',      experience: 7,  rating: 4.9, fees: 600,  location: 'Bhonsi', available: true,  hospital: 'Rainbow Hospital',   img: '👩‍⚕️' },
  { id: 4,  name: 'Dr. Vikram Singh',      specialization: 'Orthopedist',       experience: 15, rating: 4.6, fees: 1200, location: 'Delhi',     available: true,  hospital: 'Max Healthcare',     img: '👨‍⚕️' },
  { id: 5,  name: 'Dr. Ananya Iyer',       specialization: 'Dermatologist',     experience: 6,  rating: 4.7, fees: 700,  location: 'Noida', available: false, hospital: 'Skin & Hair Clinic', img: '👩‍⚕️' },
  { id: 6,  name: 'Dr. Rohit Kumar',       specialization: 'General Physician', experience: 10, rating: 4.5, fees: 400,  location: 'Rajiv Chowk',      available: true,  hospital: 'City Medical',       img: '👨‍⚕️' },
  { id: 7,  name: 'Dr. Meera Joshi',       specialization: 'Gynecologist',      experience: 11, rating: 4.8, fees: 900,  location: 'Dwarka',    available: true,  hospital: "Women's Care",       img: '👩‍⚕️' },
  { id: 8,  name: 'Dr. Sanjay Nair',       specialization: 'Psychiatrist',      experience: 8,  rating: 4.6, fees: 1100, location: 'Near Global Heights',     available: true,  hospital: 'Mind Clinic',        img: '👨‍⚕️' },
  { id: 9,  name: 'Dr. Kavita Shah',       specialization: 'Ophthalmologist',   experience: 14, rating: 4.7, fees: 850,  location: 'AIIMS', available: true,  hospital: 'Eye Care Centre',    img: '👩‍⚕️' },
  { id: 10, name: 'Dr. Arun Chakraborty',  specialization: 'ENT Specialist',    experience: 13, rating: 4.5, fees: 750,  location: 'Dhunela',   available: false, hospital: 'ENT Excellence',     img: '👨‍⚕️' },
]

export const SPECIALIZATIONS = [
  'Cardiologist', 'Neurologist', 'Pediatrician', 'Orthopedist',
  'Dermatologist', 'General Physician', 'Gynecologist',
  'Psychiatrist', 'Ophthalmologist', 'ENT Specialist',
]

export const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '05:00 PM',
]

export const SAMPLE_APPOINTMENTS = [
  { id: 1, doctorName: 'Dr. Priya Patel', specialization: 'Cardiologist',      date: '2025-02-10', time: '10:00 AM', status: 'completed', fees: 800 },
  { id: 2, doctorName: 'Dr. Sneha Reddy', specialization: 'Pediatrician',      date: '2025-03-05', time: '11:30 AM', status: 'upcoming',  fees: 600 },
  { id: 3, doctorName: 'Dr. Rohit Kumar', specialization: 'General Physician', date: '2025-01-20', time: '09:00 AM', status: 'cancelled', fees: 400 },
]