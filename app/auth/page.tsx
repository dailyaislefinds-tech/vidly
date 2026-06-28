'use client'

import { Suspense, useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function AuthForm() {
  const params = useSearchParams()
  const [tab, setTab] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (params.get('tab') === 'signup') setTab('signup')
  }, [params])

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) { setError('Wrong email or password.'); return }
    router.push('/dashboard')
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error || 'Something went wrong.'); return }
    await signIn('credentials', { email, password, redirect: false })
    router.push('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
          {tab === 'signin' ? 'Sign in to Vidly' : 'Create your account'}
        </h1>

        <div style={{ display: 'flex', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <button onClick={() => setTab('signin')} style={{ flex: 1, padding: '0.5rem', fontWeight: tab === 'signin' ? 700 : 400, borderBottom: tab === 'signin' ? '2px solid #2563eb' : 'none', background: 'none', cursor: 'pointer' }}>Sign In</button>
          <button onClick={() => setTab('signup')} style={{ flex: 1, padding: '0.5rem', fontWeight: tab === 'signup' ? 700 : 400, borderBottom: tab === 'signup' ? '2px solid #2563eb' : 'none', background: 'none', cursor: 'pointer' }}>Sign Up</button>
        </div>

        {error && <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</p>}

        <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp}>
          {tab === 'signup' && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Name</label>
              <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
          )}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Please wait...' : tab === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <AuthForm />
    </Suspense>
  )
}
