'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type ProfileResponse = {
  email?: string
  username?: string
  [key: string]: unknown
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        router.push('/')
        return
      }

      try {
        const res = await fetch('https://edjus-backend-1.onrender.com/auth/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        })

        if (!res.ok) {
          const message = `Request failed: ${res.status} ${res.statusText}`
          setError(message)
          console.error(message)
          return
        }

        const data = (await res.json()) as ProfileResponse
        setProfile(data)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Network error while fetching profile')
          console.error('Error:', err)
        }
      }
    }

    fetchData()
    return () => controller.abort()
  }, [router])

  return (
    <div style={{ padding: '2rem', color: '#f8f8f8' }}>
      <h1 style={{ marginBottom: '1rem' }}>Profile</h1>
      {error && <p style={{ color: '#f87171' }}>{error}</p>}
      {profile && (
        <div
          style={{
            background: '#0f0f0f',
            border: '1px solid #2a2a2a',
            borderRadius: 12,
            padding: '1.25rem',
            maxWidth: 420,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 14, color: '#bdbdbd' }}>Name</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {(profile.username as string) || '—'}
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 14, color: '#bdbdbd' }}>Email</div>
            <div style={{ fontSize: 16 }}>
              {(profile.email as string) || '—'}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
