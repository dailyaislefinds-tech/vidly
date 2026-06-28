'use client'
import { signIn } from 'next-auth/react'
import { useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'

function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    if (mode === 'signup') {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Sign up failed'); setLoading(false); return }
    }
    const result = await signIn('credentials', { email, password, redirect: false })
    if (result?.ok) { router.push('/dashboard') } else { setError('Invalid email or password') }
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'#f5f0ff',display:'flex',alignItems:'center',justifyContent:'center',padding:'20px',fontFamily:'sans-serif'}}>
      <div style={{background:'white',borderRadius:'16px',boxShadow:'0 4px 24px rgba(124,58,237,0.12)',padding:'40px',width:'100%',maxWidth:'420px'}}>
        <h1 style={{fontSize:'32px',fontWeight:'bold',color:'#7c3aed',textAlign:'center',marginBottom:'8px'}}>Vidly</h1>
        <p style={{color:'#888',fontSize:'14px',textAlign:'center',marginBottom:'28px'}}>TikTok-ready scripts in 60 seconds</p>
        <div style={{display:'flex',background:'#f3f0ff',borderRadius:'10px',padding:'4px',marginBottom:'24px'}}>
          <button onClick={()=>{setMode('signup');setError('')}} style={{flex:1,padding:'10px',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'600',fontSize:'14px',background:mode==='signup'?'white':'transparent',color:mode==='signup'?'#7c3aed':'#888'}}>Sign Up</button>
          <button onClick={()=>{setMode('signin');setError('')}} style={{flex:1,padding:'10px',border:'none',borderRadius:'8px',cursor:'pointer',fontWeight:'600',fontSize:'14px',background:mode==='signin'?'white':'transparent',color:mode==='signin'?'#7c3aed':'#888'}}>Sign In</button>
        </div>
        {error && <div style={{color:'#dc2626',fontSize:'13px',marginBottom:'12px',padding:'10px',background:'#fef2f2',borderRadius:'8px'}}>{error}</div>}
        {mode==='signup' && <input type="text" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'8px',padding:'12px 14px',marginBottom:'14px',fontSize:'15px',boxSizing:'border-box'}} />}
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'8px',padding:'12px 14px',marginBottom:'14px',fontSize:'15px',boxSizing:'border-box'}} />
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'8px',padding:'12px 14px',marginBottom:'14px',fontSize:'15px',boxSizing:'border-box'}} />
        <button onClick={handleSubmit} disabled={loading} style={{width:'100%',background:'#7c3aed',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'16px',fontWeight:'bold',cursor:'pointer',opacity:loading?0.7:1}}>
          {loading?'Please wait...':mode==='signup'?'Create Free Account':'Sign In'}
        </button>
      </div>
    </div>
  )
}

export default function AuthPage() {
  return <Suspense fallback={<div>Loading...</div>}><AuthForm /></Suspense>
}