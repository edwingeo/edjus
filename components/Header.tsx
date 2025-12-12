'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import styles from './Header.module.css'
import Logo from './Logo'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [roles, setRoles] = useState<string[]>([])

  const loadRolesFromStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem('roles')
      if (!raw) {
        setRoles([])
        return
      }
      const parsed = JSON.parse(raw)
      setRoles(Array.isArray(parsed) ? parsed : [String(parsed)])
    } catch (err) {
      console.error('Failed to parse roles from storage', err)
      setRoles([])
    }
  }, [])

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/session')
        const data = await res.json().catch(() => ({}))
        setIsLoggedIn(Boolean(data?.authenticated))
      } catch (err) {
        console.error('Failed to check session', err)
      }
    }
    checkSession()
    // load roles after mount (client-only)
    loadRolesFromStorage()

    // react to storage changes (other tabs)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'roles') loadRolesFromStorage()
      if (e.key === 'authenticated') {
        // optional: sync auth flag across tabs if you store it
        setIsLoggedIn(Boolean(localStorage.getItem('authenticated')))
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [loadRolesFromStorage])

  const handleBookCall = () => {
    router.push('/contact-us')
  }

  const handleLoginClick = () => {
    if (isLoggedIn) {
      fetch('/api/logout', { method: 'POST' })
        .catch((err) => console.error('Failed to logout', err))
        .finally(() => {
          setIsLoggedIn(false)
          setRoles([])
          localStorage.removeItem('roles')
          localStorage.removeItem('authenticated')
          router.push('/')
        })
      return
    }
    setShowRegister(false)
    setShowLogin(true)
  }

  const handleSwitchToSignup = () => {
    setShowLogin(false)
    setShowRegister(true)
  }

  const handleSwitchToSignin = () => {
    setShowLogin(true)
    setShowRegister(false)
  }

  // adjust allowed roles for showing dashboard
  const canSeeDashboard = roles.includes('Admin')

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo}>
            <Logo />
          </Link>
          <nav className={styles.nav}>
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Link>
            <Link
              href="/about-us"
              className={`${styles.navLink} ${pathname === '/about-us' ? styles.active : ''}`}
            >
              Services
            </Link>
            <Link
              href="/contact-us"
              className={`${styles.navLink} ${pathname === '/contact-us' ? styles.active : ''}`}
            >
              Contact Us
            </Link>
            {canSeeDashboard && (
              <Link
                href="/dashboard"
                className={`${styles.navLink} ${pathname === '/dashboard' ? styles.active : ''}`}
              >
                Dashboard
              </Link>
            )}
          </nav>
          <div className={styles.actions}>
            <button className={styles.actionButton} onClick={handleBookCall}>
              Book a Quick call with us for Enquiry
            </button>
            <button
              className={styles.actionButton}
              onClick={handleLoginClick}
            >
              {isLoggedIn ? 'Logout' : 'Login/Register'}
            </button>
          </div>
          <div className={styles.menuIcon}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <LoginModal
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true)
          loadRolesFromStorage()
        }}
        onSwitchToSignup={handleSwitchToSignup}
      />
      <RegisterModal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitchToSignin={handleSwitchToSignin}
      />
    </>
  )
}
