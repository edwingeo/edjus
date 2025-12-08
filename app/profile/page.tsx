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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile', { signal: controller.signal })

        if (res.status === 401) {
          router.push('/')
          return
        }

        const data = await res.json().catch(() => ({}))

        if (!res.ok) {
          setError(data?.message || 'Failed to load profile')
          return
        }

        setProfile(data)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError('Network error while fetching profile')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchProfile()

    return () => controller.abort()
  }, [router])

  return (
    <div style={{ padding: '2rem', color: '#f8f8f8' }}>
      <h1 style={{ marginBottom: '1rem' }}>Profile</h1>
      {loading && <p>Loading…</p>}
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
