import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Transform Data into a Business Advantage
          </h1>
          <p className={styles.description}>
            Harness the power of data to build experiences and technologies that
            work smarter, drive results, and fuel innovation.
          </p>
          <a href="/contact-us" className={styles.ctaButton}>
            Get in Touch
          </a>
          <div className={styles.trustSection}>
            <p className={styles.trustTitle}>Trusted Technology Partner</p>
            <p className={styles.trustDescription}>
              For a Global Clientele Spanning Multiple Industries
            </p>
          </div>
        </div>
        <div className={styles.visual}>
          <div className={styles.abstractGraphic}>
            <div className={styles.shape1}></div>
            <div className={styles.shape2}></div>
            <div className={styles.shape3}></div>
            <div className={styles.shape4}></div>
            <div className={styles.shape5}></div>
            <div className={styles.shape6}></div>
            <div className={styles.shape7}></div>
            <div className={styles.shape8}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

