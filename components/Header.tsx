'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'
import Logo from './Logo'

export default function Header() {
  const pathname = usePathname()

  return (
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
          <button className={styles.actionButton}>
            Book a Quick call with us for Enquiry
          </button>
          <Link href="/contact-us" className={styles.actionLink}>
            Fix an appointment
          </Link>
          <Link href="/contact-us" className={styles.actionLink}>
            Get Quote
          </Link>
        </div>
        <div className={styles.menuIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  )
}

