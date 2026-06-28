'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function DashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [product, setProduct] = useState('')
  const [script, setScript] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/auth')
  }, [status, router])

  const generateScript = async () => {
    if (!product.trim()) return
    setLoading(true)
    setError('')
    setScript('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed') } else { setScript(data.script) }
    } catch { setError('Something went wrong') }
    setLoading(false)
  }

  if (status === 'loading') return <div style={{padding:'40px',textAlign:'center',color:'#7c3aed'}}>Loading...</div>

  return (
    <div style={{minHeight:'100vh',background:'#f5f0ff',padding:'20px',fontFamily:'sans-serif'}}>
      <div style={{maxWidth:'720px',margin:'0 auto'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'32px'}}>
          <h1 style={{fontSize:'28px',fontWeight:'bold',color:'#7c3aed',margin:0}}>Vidly</h1>
          <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
            <span style={{color:'#666',fontSize:'14px'}}>👋 {session?.user?.name || session?.user?.email}</span>
            <button onClick={()=>signOut({callbackUrl:'/'})} style={{background:'none',border:'1px solid #ddd',borderRadius:'8px',padding:'6px 14px',color:'#666',cursor:'pointer',fontSize:'13px'}}>Sign out</button>
          </div>
        </div>
        <div style={{background:'white',borderRadius:'16px',boxShadow:'0 4px 24px rgba(124,58,237,0.12)',padding:'32px',marginBottom:'24px'}}>
          <h2 style={{fontSize:'20px',fontWeight:'700',marginBottom:'8px',color:'#1a1a1a'}}>Generate TikTok Script</h2>
          <p style={{color:'#888',fontSize:'14px',marginBottom:'20px'}}>Describe your product and get a viral script in seconds</p>
          <textarea placeholder="e.g. A wireless LED desk lamp with 3 brightness levels..." value={product} onChange={e=>setProduct(e.target.value)} rows={3} style={{width:'100%',border:'1px solid #e5e7eb',borderRadius:'8px',padding:'12px 14px',fontSize:'15px',boxSizing:'border-box',resize:'vertical',marginBottom:'16px',fontFamily:'sans-serif'}} />
          <button onClick={generateScript} disabled={loading||!product.trim()} style={{width:'100%',background:loading?'#a78bfa':'#7c3aed',color:'white',border:'none',borderRadius:'8px',padding:'14px',fontSize:'16px',fontWeight:'bold',cursor:loading?'default':'pointer'}}>
            {loading?'✨ Generating...':'🎬 Generate Script'}
          </button>
          {error && <div style={{marginTop:'16px',padding:'12px',background:'#fef2f2',borderRadius:'8px',color:'#dc2626',fontSize:'14px'}}>{error}</div>}
        </div>
        {script && (
          <div style={{background:'white',borderRadius:'16px',boxShadow:'0 4px 24px rgba(124,58,237,0.12)',padding:'32px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <h3 style={{fontSize:'18px',fontWeight:'700',color:'#1a1a1a',margin:0}}>Your Script 🎉</h3>
              <button onClick={()=>navigator.clipboard.writeText(script)} style={{background:'#f5f0ff',border:'none',borderRadius:'8px',padding:'8px 14px',color:'#7c3aed',cursor:'pointer',fontSize:'13px',fontWeight:'600'}}>Copy</button>
            </div>
            <div style={{background:'#f9f7ff',borderRadius:'8px',padding:'20px',color:'#333',whiteSpace:'pre-wrap',lineHeight:'1.7',fontSize:'15px'}}>{script}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return <Suspense fallback={<div>Loading...</div>}><DashboardContent /></Suspense>
}