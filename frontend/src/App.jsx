import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:8082'
const categories = ['Pothole', 'Garbage', 'Broken Streetlight', 'Water Leakage', 'Road Damage', 'Drainage']

function App() {
  const [auth, setAuth] = useState(() => JSON.parse(localStorage.getItem('civicfix-auth') || 'null'))
  const [view, setView] = useState('dashboard')
  const [authMode, setAuthMode] = useState('login')
  const [authForm, setAuthForm] = useState({ name: '', email: '', password: '' })
  const [complaints, setComplaints] = useState([])
  const [stats, setStats] = useState({ total: 0, reported: 0, inProgress: 0, resolved: 0 })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [report, setReport] = useState({
    title: '', description: '', category: 'Pothole',
    latitude: 28.6139, longitude: 77.2090, address: '', photoUrl: '',
  })

  const request = async (path, options = {}) => {
    const headers = { 'Content-Type': 'application/json', ...options.headers }
    if (auth?.token) headers.Authorization = `Bearer ${auth.token}`
    const response = await fetch(`${API_URL}${path}`, { ...options, headers })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(data.message || 'Request failed')
    return data
  }

  const loadData = async () => {
    if (!auth) return
    try {
      if (auth.role === 'ADMIN' || auth.role === 'AUTHORITY') {
        const [items, totals] = await Promise.all([
          request('/api/admin/complaints'),
          request('/api/admin/stats'),
        ])
        setComplaints(items)
        setStats(totals)
      } else {
        setComplaints(await request('/api/complaints/mine'))
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  useEffect(() => {
    loadData()
  }, [auth])

  const submitAuth = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      const path = authMode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const payload = authMode === 'login'
        ? { email: authForm.email, password: authForm.password }
        : authForm
      const result = await request(path, { method: 'POST', body: JSON.stringify(payload) })
      localStorage.setItem('civicfix-auth', JSON.stringify(result))
      setAuth(result)
      setView('dashboard')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const submitReport = async (event) => {
    event.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await request('/api/complaints', { method: 'POST', body: JSON.stringify(report) })
      setMessage('Complaint submitted successfully.')
      setReport({ title: '', description: '', category: 'Pothole', latitude: 28.6139, longitude: 77.2090, address: '', photoUrl: '' })
      await loadData()
      setView('dashboard')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await request(`/api/admin/complaints/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      await loadData()
    } catch (error) {
      setMessage(error.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('civicfix-auth')
    setAuth(null)
  }

  if (!auth) {
    return (
      <main className="auth-page">
        <section className="auth-brand">
          <div className="brand-mark">C</div>
          <div>
            <p className="eyebrow">PUBLIC CIVIC SERVICES</p>
            <h1>CivicFix <span>AI</span></h1>
          </div>
        </section>
        <section className="auth-card">
          <div className="auth-toggle">
            <button className={authMode === 'login' ? 'active' : ''} onClick={() => setAuthMode('login')}>Sign in</button>
            <button className={authMode === 'register' ? 'active' : ''} onClick={() => setAuthMode('register')}>Create account</button>
          </div>
          <h2>{authMode === 'login' ? 'Welcome back' : 'Join your community'}</h2>
          <p className="auth-subtitle">
            {authMode === 'login'
              ? 'Sign in to report and track city issues.'
              : 'Create an account and help improve your city.'}
          </p>
          <form onSubmit={submitAuth} className="auth-form">
            {authMode === 'register' && (
              <label>Full name
                <input value={authForm.name} onChange={(event) => setAuthForm({ ...authForm, name: event.target.value })} placeholder="Aarav Sharma" required />
              </label>
            )}
            <label>Email address
              <input type="email" value={authForm.email} onChange={(event) => setAuthForm({ ...authForm, email: event.target.value })} placeholder="you@example.com" required />
            </label>
            <label>Password
              <input type="password" value={authForm.password} onChange={(event) => setAuthForm({ ...authForm, password: event.target.value })} placeholder="Minimum 8 characters" minLength={8} required />
            </label>
            {message && <div className="form-message error">{message}</div>}
            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? 'Please wait...' : authMode === 'login' ? 'Sign in securely' : 'Create account'}
            </button>
          </form>
          <p className="demo-account">Demo administrator: <strong>admin@civicfix.ai</strong> / <strong>Admin@123</strong></p>
        </section>
      </main>
    )
  }

  const isAdmin = auth.role === 'ADMIN' || auth.role === 'AUTHORITY'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small">C</div>
          <div><strong>CivicFix</strong><span>AI</span></div>
        </div>
        <nav>
          <button className={view === 'dashboard' ? 'active' : ''} onClick={() => setView('dashboard')}><span>◫</span> Dashboard</button>
          {isAdmin
            ? <button className={view === 'complaints' ? 'active' : ''} onClick={() => setView('complaints')}><span>▦</span> Complaint queue</button>
            : <button className={view === 'report' ? 'active' : ''} onClick={() => setView('report')}><span>＋</span> Report issue</button>}
          <button className={view === 'map' ? 'active' : ''} onClick={() => setView('map')}><span>⌖</span> City map</button>
        </nav>
        <div className="sidebar-footer">
          <div className="avatar">{auth.name.slice(0, 1).toUpperCase()}</div>
          <div><strong>{auth.name}</strong><p>{auth.role}</p></div>
          <button onClick={logout} title="Sign out">↪</button>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div><p>SMART CITY WORKSPACE</p><h1>{view === 'report' ? 'Report a civic issue' : view === 'map' ? 'City issue map' : isAdmin ? 'Authority dashboard' : 'Your dashboard'}</h1></div>
          {!isAdmin && <button className="primary-button compact" onClick={() => setView('report')}>＋ Report issue</button>}
        </header>

        {message && <div className="form-message success">{message}</div>}

        {(view === 'dashboard' || view === 'complaints') && (
          <>
            {isAdmin && (
              <section className="stats-grid">
                <StatCard label="Total complaints" value={stats.total} icon="◉" tone="green" />
                <StatCard label="Awaiting review" value={stats.reported} icon="◷" tone="amber" />
                <StatCard label="In progress" value={stats.inProgress} icon="↗" tone="blue" />
                <StatCard label="Resolved" value={stats.resolved} icon="✓" tone="purple" />
              </section>
            )}
            <section className="panel">
              <div className="panel-heading">
                <div><h2>{isAdmin ? 'Complaint queue' : 'My complaints'}</h2><p>Monitor progress and resolution updates.</p></div>
                <span className="live-badge">● LIVE</span>
              </div>
              {complaints.length === 0 ? (
                <div className="empty-state"><div>⌖</div><h3>No complaints yet</h3><p>{isAdmin ? 'New citizen reports will appear here.' : 'Report an issue to start tracking it.'}</p></div>
              ) : (
                <div className="complaint-list">
                  {complaints.map((complaint) => (
                    <article className="complaint-card" key={complaint.id}>
                      <div className="complaint-icon">{categoryIcon(complaint.category)}</div>
                      <div className="complaint-content">
                        <div className="complaint-title"><h3>{complaint.title}</h3><span className={`status ${complaint.status.toLowerCase()}`}>{complaint.status.replace('_', ' ')}</span></div>
                        <p>{complaint.description}</p>
                        <div className="complaint-meta"><span>{complaint.category}</span><span>Priority {complaint.priorityScore}</span>{complaint.address && <span>{complaint.address}</span>}</div>
                      </div>
                      {isAdmin && (
                        <select value={complaint.status} onChange={(event) => updateStatus(complaint.id, event.target.value)}>
                          <option value="REPORTED">Reported</option>
                          <option value="ACKNOWLEDGED">Acknowledged</option>
                          <option value="IN_PROGRESS">In progress</option>
                          <option value="RESOLVED">Resolved</option>
                        </select>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {view === 'report' && (
          <section className="report-layout">
            <form className="panel report-form" onSubmit={submitReport}>
              <div className="panel-heading"><div><h2>Issue details</h2><p>Provide accurate information for faster resolution.</p></div></div>
              <label>Issue title<input value={report.title} onChange={(event) => setReport({ ...report, title: event.target.value })} placeholder="Example: Large pothole near bus stop" required /></label>
              <label>Category<select value={report.category} onChange={(event) => setReport({ ...report, category: event.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
              <label>Description<textarea value={report.description} onChange={(event) => setReport({ ...report, description: event.target.value })} placeholder="Describe the problem, size, and nearby landmark..." required /></label>
              <label>Address or landmark<input value={report.address} onChange={(event) => setReport({ ...report, address: event.target.value })} placeholder="Sector 12, Main Market Road" /></label>
              <label>Photo URL <span>(optional)</span><input type="url" value={report.photoUrl} onChange={(event) => setReport({ ...report, photoUrl: event.target.value })} placeholder="https://..." /></label>
              <button className="primary-button" type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit complaint'}</button>
            </form>
            <aside className="panel location-panel">
              <div className="panel-heading"><div><h2>Location</h2><p>Issue coordinates</p></div></div>
              <iframe title="OpenStreetMap" src={`https://www.openstreetmap.org/export/embed.html?bbox=${report.longitude - 0.02}%2C${report.latitude - 0.02}%2C${report.longitude + 0.02}%2C${report.latitude + 0.02}&layer=mapnik&marker=${report.latitude}%2C${report.longitude}`} />
              <div className="coordinate-grid">
                <label>Latitude<input type="number" step="0.0001" value={report.latitude} onChange={(event) => setReport({ ...report, latitude: Number(event.target.value) })} /></label>
                <label>Longitude<input type="number" step="0.0001" value={report.longitude} onChange={(event) => setReport({ ...report, longitude: Number(event.target.value) })} /></label>
              </div>
            </aside>
          </section>
        )}

        {view === 'map' && (
          <section className="panel city-map">
            <div className="panel-heading"><div><h2>City issue map</h2><p>Reported locations and status overview.</p></div></div>
            <iframe title="CivicFix city map" src="https://www.openstreetmap.org/export/embed.html?bbox=77.1800%2C28.5800%2C77.2400%2C28.6400&layer=mapnik" />
          </section>
        )}
      </main>
    </div>
  )
}

function StatCard({ label, value, icon, tone }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div><p>{label}</p><strong>{value}</strong></div></article>
}

function categoryIcon(category) {
  return ({ Pothole: '⚠', Garbage: '♻', 'Broken Streetlight': '☀', 'Water Leakage': '◌', 'Road Damage': '◆', Drainage: '⌁' })[category] || '●'
}

export default App
