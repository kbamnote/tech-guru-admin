import { useState, useEffect, useCallback } from 'react'

const API = 'https://tech-guru-backend-production.up.railway.app'

// ── Static admin credentials ──────────────────────────────────────
const ADMIN_EMAIL = 'admin@imtechguru.in'
const ADMIN_PASSWORD = 'imtech@2025'

// ── Helpers ───────────────────────────────────────────────────────
function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}
function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}
function formatCurrency(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN')
}

// ── Avatar colours (teal-accented palette) ────────────────────────
const AVATAR_PALETTE = [
  { bg: '#3c6e71', text: '#ffffff' },
  { bg: '#2f5a5c', text: '#ffffff' },
  { bg: '#5b8c8f', text: '#ffffff' },
  { bg: '#1a1a1a', text: '#ffffff' },
  { bg: '#6b6b6b', text: '#ffffff' },
  { bg: '#4d8b8f', text: '#ffffff' },
]

// ══════════════════════════════════════════════════════════════════
//  LOGIN PAGE
// ══════════════════════════════════════════════════════════════════
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        onLogin()
      } else {
        setError('Invalid email or password.')
      }
      setLoading(false)
    }, 600)
  }

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex flex-col items-center justify-center px-4">

      {/* Brand mark */}
      <div className="mb-8 text-center fade-in">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-9 h-9 rounded bg-[#1a1a1a] flex items-center justify-center">
            <span className="text-white text-sm font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>IT</span>
          </div>
          <span className="text-[#1a1a1a] text-xl font-semibold" style={{ fontFamily: 'Outfit, sans-serif' }}>
            ImTechGuru
          </span>
        </div>
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b6b6b] font-medium">Admin Panel</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-[400px] bg-white rounded shadow-sm border border-[#e6e6e6] p-8 fade-in">
        <h1 className="text-2xl font-semibold text-[#1a1a1a] mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Sign in
        </h1>
        <p className="text-sm text-[#6b6b6b] mb-7">Enter your admin credentials to continue.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="admin@imtechguru.in"
              required
              className="w-full px-4 py-3 border border-[#e6e6e6] rounded text-sm text-[#1a1a1a] placeholder-[#b0b0b0] focus:outline-none focus:border-[#3c6e71] transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#6b6b6b] mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 border border-[#e6e6e6] rounded text-sm text-[#1a1a1a] placeholder-[#b0b0b0] focus:outline-none focus:border-[#3c6e71] transition-colors pr-11"
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b0b0b0] hover:text-[#3c6e71] transition-colors"
                tabIndex={-1}
              >
                {showPass ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#1a1a1a] text-white text-sm font-semibold uppercase tracking-wider rounded hover:bg-[#3c6e71] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Signing in…
              </>
            ) : 'Sign In'}
          </button>
        </form>
      </div>

      <p className="mt-6 text-xs text-[#b0b0b0]">© 2025 ImTechGuru</p>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  SMALL COMPONENTS
// ══════════════════════════════════════════════════════════════════
function Avatar({ name, index }) {
  const palette = AVATAR_PALETTE[index % AVATAR_PALETTE.length]
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: palette.bg, color: palette.text }}
    >
      {initials(name)}
    </div>
  )
}

function StatCard({ label, value, sub, accent = false }) {
  return (
    <div className="bg-white border border-[#e6e6e6] rounded p-5 hover:border-[#3c6e71]/40 transition-colors duration-200">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#6b6b6b]">{label}</p>
      <p className={`text-3xl font-semibold mt-2 ${accent ? 'text-[#3c6e71]' : 'text-[#1a1a1a]'}`}
         style={{ fontFamily: 'Outfit, sans-serif' }}>
        {value}
      </p>
      {sub && <p className="text-xs text-[#a0a0a0] mt-1">{sub}</p>}
    </div>
  )
}

function PaymentBadge({ method }) {
  const map = {
    upi:    'bg-[#f0f7f7] text-[#3c6e71] border-[#c5e0e2]',
    card:   'bg-[#f0f4ff] text-[#4466cc] border-[#c0cef5]',
    wallet: 'bg-[#fff8ec] text-[#b07000] border-[#f0d080]',
  }
  return (
    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded border ${map[method] || 'bg-[#f4f4f4] text-[#6b6b6b] border-[#e6e6e6]'}`}>
      {method || 'upi'}
    </span>
  )
}

function SkeletonRow() {
  return (
    <tr className="border-b border-[#f0f0f0]">
      {[140, 190, 110, 70, 90].map((w, i) => (
        <td key={i} className="px-5 py-4">
          <div className="skeleton h-3.5" style={{ width: w }} />
        </td>
      ))}
    </tr>
  )
}

function EmptyState() {
  return (
    <tr>
      <td colSpan={5}>
        <div className="text-center py-16">
          <p className="text-4xl mb-3 opacity-25">📭</p>
          <p className="text-sm text-[#6b6b6b]">No customers yet.</p>
          <p className="text-xs text-[#b0b0b0] mt-1">Orders placed on the store will appear here.</p>
        </div>
      </td>
    </tr>
  )
}

function ErrorState({ onRetry }) {
  return (
    <tr>
      <td colSpan={5}>
        <div className="text-center py-16">
          <p className="text-4xl mb-3 opacity-25">⚠️</p>
          <p className="text-sm text-[#6b6b6b] mb-4">Could not connect to backend server.</p>
          <button onClick={onRetry} className="text-sm text-[#3c6e71] border border-[#3c6e71]/30 px-4 py-2 rounded hover:bg-[#f0f7f7] transition-colors">
            Try again
          </button>
        </div>
      </td>
    </tr>
  )
}

// ══════════════════════════════════════════════════════════════════
//  DASHBOARD PAGE
// ══════════════════════════════════════════════════════════════════
function Dashboard({ onLogout }) {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [spinning, setSpinning] = useState(false)
  const [search, setSearch] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setSpinning(true)
    else setLoading(true)
    setError(false)
    try {
      const res = await fetch(`${API}/api/admin/customers`)
      if (!res.ok) throw new Error('Server error')
      const data = await res.json()
      setCustomers(data.customers || [])
      setLastUpdated(new Date())
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setSpinning(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = customers.reduce((sum, c) => sum + (c.orderTotal || 0), 0)

  return (
    <div className="min-h-screen bg-[#f4f4f4]">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#e6e6e6]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-[#1a1a1a] flex items-center justify-center">
              <span className="text-white text-xs font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>IT</span>
            </div>
            <span className="text-[#1a1a1a] font-semibold text-base tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              ImTechGuru
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#6b6b6b] font-medium ml-1 hidden sm:inline">
              / Admin
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#3c6e71] pulse inline-block" />
              {lastUpdated && (
                <span className="text-xs text-[#b0b0b0]">Updated {formatTime(lastUpdated)}</span>
              )}
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs text-[#6b6b6b] hover:text-[#1a1a1a] border border-[#e6e6e6] px-3 py-1.5 rounded hover:border-[#1a1a1a] transition-colors"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* Page title */}
        <div className="mb-8 fade-in">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Customer Overview
          </h1>
          <p className="text-sm text-[#6b6b6b] mt-1">All customers who completed an order on the store.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 fade-in">
          <StatCard
            label="Total Customers"
            value={loading ? '—' : customers.length}
            sub="All time"
          />
          <StatCard
            label="Total Revenue"
            value={loading ? '—' : formatCurrency(totalRevenue)}
            sub="All orders combined"
            accent
          />
          <StatCard
            label="Latest Customer"
            value={loading || customers.length === 0 ? '—' : customers[0].name.split(' ')[0]}
            sub={customers.length > 0 ? formatDate(customers[0].createdAt) : 'No orders yet'}
          />
        </div>

        {/* Table card */}
        <div className="bg-white border border-[#e6e6e6] rounded overflow-hidden fade-in">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-[#f0f0f0]">
            <div>
              <h2 className="text-base font-semibold text-[#1a1a1a]" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Customers
              </h2>
              <p className="text-xs text-[#a0a0a0] mt-0.5">
                {loading ? 'Loading…' : `${filtered.length} of ${customers.length} records`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c0c0c0]" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search name or email…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-[#f9f9f9] border border-[#e6e6e6] text-sm text-[#1a1a1a] placeholder-[#b0b0b0] pl-8 pr-3 py-2 rounded w-52 focus:outline-none focus:border-[#3c6e71] transition-colors"
                />
              </div>

              {/* Refresh */}
              <button
                onClick={() => load(true)}
                disabled={spinning}
                className="flex items-center gap-1.5 text-sm text-[#6b6b6b] border border-[#e6e6e6] px-3.5 py-2 rounded hover:border-[#3c6e71] hover:text-[#3c6e71] transition-all disabled:opacity-50"
              >
                <svg className={spinning ? 'spin' : ''} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                  <path d="M21 3v5h-5"/>
                  <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                  <path d="M3 21v-5h5"/>
                </svg>
                Refresh
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f0f0f0] bg-[#fafafa]">
                  {['Customer', 'Email', 'Payment', 'Order Total', 'Date'].map((h, i) => (
                    <th key={h} className={`text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#a0a0a0] px-5 py-3.5 ${i > 1 ? 'hidden md:table-cell' : ''}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : error ? (
                  <ErrorState onRetry={() => load()} />
                ) : filtered.length === 0 ? (
                  <EmptyState />
                ) : (
                  filtered.map((c, i) => (
                    <tr key={c._id} className="border-b border-[#f5f5f5] hover:bg-[#fafafa] transition-colors">
                      {/* Name + Order ID */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={c.name} index={i} />
                          <div>
                            <p className="text-sm font-semibold text-[#1a1a1a] leading-tight">{c.name}</p>
                            <p className="text-[11px] text-[#b0b0b0] mt-0.5 font-mono tracking-tight">{c.orderId}</p>
                          </div>
                        </div>
                      </td>
                      {/* Email */}
                      <td className="px-5 py-4">
                        <a href={`mailto:${c.email}`} className="text-sm text-[#3c6e71] hover:text-[#2f5a5c] hover:underline transition-colors">
                          {c.email}
                        </a>
                      </td>
                      {/* Payment */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <PaymentBadge method={c.paymentMethod} />
                      </td>
                      {/* Total */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm font-medium text-[#1a1a1a]">{formatCurrency(c.orderTotal)}</span>
                      </td>
                      {/* Date */}
                      <td className="px-5 py-4 hidden md:table-cell">
                        <p className="text-sm text-[#6b6b6b]">{formatDate(c.createdAt)}</p>
                        <p className="text-[11px] text-[#b0b0b0]">{formatTime(c.createdAt)}</p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer count */}
          {!loading && !error && filtered.length > 0 && (
            <div className="px-6 py-3 border-t border-[#f0f0f0] text-[11px] text-[#b0b0b0]">
              Showing {filtered.length} customer{filtered.length !== 1 ? 's' : ''}
              {search && ` matching "${search}"`}
            </div>
          )}
        </div>

      </main>

      <footer className="text-center py-8 text-[11px] text-[#c0c0c0]">
        © 2025 ImTechGuru. Admin Panel.
      </footer>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════
//  ROOT
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem('admin_auth') === 'true'
  )

  const handleLogin = () => {
    sessionStorage.setItem('admin_auth', 'true')
    setLoggedIn(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    setLoggedIn(false)
  }

  return loggedIn
    ? <Dashboard onLogout={handleLogout} />
    : <LoginPage onLogin={handleLogin} />
}
