'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data?.error || 'Registration failed')
      } else {
        setSuccess('Registration successful — please check your email (if applicable).')
        setForm({ name: '', email: '', password: '', confirmPassword: '' })
        // optionally redirect to login after short delay
        setTimeout(() => router.push('/login'), 1200)
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: '48px auto', padding: 24 }}>
      <h1>Register</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="name"
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <label>
          Confirm Password
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            autoComplete="new-password"
            style={{ width: '100%', padding: 8 }}
          />
        </label>

        <button type="submit" disabled={loading} style={{ padding: '10px 14px' }}>
          {loading ? 'Registering…' : 'Create account'}
        </button>

        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
      </form>
    </div>
  )
}