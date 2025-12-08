'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './LoginModal.module.css'

type RegisterModalProps = {
  open: boolean
  onClose: () => void
  onRegisterSuccess?: () => void
  onSwitchToSignin?: () => void
}

export default function RegisterModal({ open, onClose, onRegisterSuccess, onSwitchToSignin }: RegisterModalProps) {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setUserName('')
      setPassword('')
      setConfirmPassword('')
      setError(null)
      setRole('')
      setSuccess(null)
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
    if (password !== confirmPassword) return 'Passwords do not match'
    if (!role) return 'Role is required'
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
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName, password, role }),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setSuccess("Succesfully registerd. Please use your credential to login")
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
          Sign UP
        </h2>

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
        {
          success && (
            <div className={styles.success} role="alert">
              {success}
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
          <label className={styles.label}>
            <span>Confirm Password</span> 
          <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </label>
          <label className={styles.label}>
            <span>Role</span>
          <select id="role " name="role" value={role} required onChange={(e)=>setRole(e.target.value)}>
              <option value="">Select One</option>
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </label>



          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? 'Signing up…' : 'Sign up'}
          </button>
        </form>

        <p className={styles.footerText}>
          Have an account?{' '}
          <a
            href="#"
            className={styles.signupLink}
            onClick={(e) => {
              e.preventDefault()
              onClose()
              onSwitchToSignin?.()
            }}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
