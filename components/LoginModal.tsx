'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './LoginModal.module.css'

type LoginModalProps = {
  open: boolean
  onClose: () => void
  onLoginSuccess?: () => void
}

export default function LoginModal({ open, onClose, onLoginSuccess }: LoginModalProps) {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setUserName('')
      setPassword('')
      setRemember(false)
      setError(null)
    }
  }, [open])

  if (!open) {
    return null
  }


  const validate = () => {
    if (!userName) return 'userName is required'
    if (!/^\S+@\S+\.\S+$/.test(userName)) return 'Enter a valid userName'
    if (!password) return 'Password is required'
    if (password.length < 6) return 'Password must be at least 6 characters'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://edjus-backend-1.onrender.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: userName, password }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        if (data?.access_token) {
          localStorage.setItem('token', data.access_token)
        }
        onClose()
        onLoginSuccess?.()
        router.push('/profile')
      } else {
        setError(data?.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick} role="presentation">
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="login-heading">
        <button type="button" className={styles.closeButton} aria-label="Close login dialog" onClick={onClose}>
          ×
        </button>
        <h2 id="login-heading" className={styles.title}>
          Sign in
        </h2>

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <span>Email</span>
            <input
              type="email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label className={styles.label}>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </label>

          <div className={styles.row}>
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                aria-label="Remember me"
              />
              <span>Remember me</span>
            </label>
            <a href="/forgot-password" className={styles.forgotLink}>
              Forgot?
            </a>
          </div>

          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className={styles.footerText}>
          Don&apos;t have an account?{' '}
          <a href="/signup" className={styles.signupLink}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}
