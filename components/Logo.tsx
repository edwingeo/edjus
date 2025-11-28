import Image from 'next/image'
import styles from './Logo.module.css'

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <Image
        src="/assets/logo.jpeg"
        alt="Edjus Technologies Logo"
        width={48}
        height={48}
        className={styles.logoImage}
        priority
      />
      <div className={styles.logoText}>
        <span className={styles.edjusText}>EDJUS</span>
        <span className={styles.technologiesText}>TECHNOLOGIES</span>
      </div>
    </div>
  )
}

