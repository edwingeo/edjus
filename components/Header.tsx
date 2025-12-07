'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './Header.module.css'
import Logo from './Logo'
import LoginModal from './LoginModal'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    setIsLoggedIn(Boolean(token))
  }, [])

  const handleBookCall = () => {
    router.push('/contact-us')
  }

  const handleLoginClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token')
      setIsLoggedIn(false)
      router.push('/')
      return
    }
    setShowLogin(true)
  }

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
        onLoginSuccess={() => setIsLoggedIn(true)}
      />
    </>
  )
}
