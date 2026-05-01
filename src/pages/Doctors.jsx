import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DOCTORS, SPECIALIZATIONS } from '../data/mockData'
import DoctorCard from '../components/DoctorCard'
import useDebounce from '../hooks/useDebounce'

const ITEMS_PER_PAGE = 6

export default function Doctors() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [specialization, setSpecialization] = useState(searchParams.get('specialization') || '')
  const [sortBy, setSortBy] = useState('rating')
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const debouncedSearch = useDebounce(search, 400)

  const filtered = useMemo(() => {
    let result = [...DOCTORS]
    if (debouncedSearch) {
      result = result.filter(d =>
        d.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        d.specialization.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        d.location.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }
    if (specialization) result = result.filter(d => d.specialization === specialization)
    if (onlyAvailable)  result = result.filter(d => d.available)
    if (sortBy === 'rating')     result.sort((a, b) => b.rating - a.rating)
    if (sortBy === 'fees_low')   result.sort((a, b) => a.fees - b.fees)
    if (sortBy === 'fees_high')  result.sort((a, b) => b.fees - a.fees)
    if (sortBy === 'experience') result.sort((a, b) => b.experience - a.experience)
    return result
  }, [debouncedSearch, specialization, sortBy, onlyAvailable])

  useEffect(() => { setCurrentPage(1) }, [debouncedSearch, specialization, sortBy, onlyAvailable])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated  = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  function clearFilters() {
    setSearch(''); setSpecialization(''); setSortBy('rating'); setOnlyAvailable(false); setCurrentPage(1)
  }

  return (
    <div className="page">
      <div className="container">
        <h2 className="section-title">Find Doctors</h2>
        <p className="section-sub">Search from our list of expert doctors</p>

        {/* Filters */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input className="form-input" placeholder="🔍 Search by name, city..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 2, minWidth: 200 }} />
            <select className="form-input" value={specialization} onChange={e => setSpecialization(e.target.value)} style={{ flex: 1, minWidth: 150 }}>
              <option value="">All Specializations</option>
              {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="form-input" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ flex: 1, minWidth: 150 }}>
              <option value="rating">Top Rated</option>
              <option value="fees_low">Fees: Low → High</option>
              <option value="fees_high">Fees: High → Low</option>
              <option value="experience">Experience</option>
            </select>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={onlyAvailable} onChange={e => setOnlyAvailable(e.target.checked)} />
              Available Only
            </label>
            <button className="btn btn-gray" onClick={clearFilters}>Clear</button>
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#6b7280' }}>
            Showing {filtered.length} doctor{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Cards */}
        {paginated.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>No doctors found</p>
            <p>Try changing your filters</p>
            <button className="btn btn-blue" style={{ marginTop: '1rem' }} onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          <div className="grid-3">
            {paginated.map(doctor => <DoctorCard key={doctor.id} doctor={doctor} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>←</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} className={`page-btn ${currentPage === page ? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
            ))}
            <button className="page-btn" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>→</button>
          </div>
        )}
      </div>
    </div>
  )
}