import styles from './page.module.css'

export default function AboutUs() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>About Us</h1>
          <p className={styles.subtitle}>
            Building the future, one solution at a time
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.sectionText}>
            Edjus was founded with a vision to transform the way businesses
            operate through innovative technology solutions. We believe in
            creating value that goes beyond the ordinary, delivering excellence
            in every project we undertake.
          </p>
          <p className={styles.sectionText}>
            Our team of experts brings together years of experience and a
            passion for innovation. We work closely with our clients to
            understand their unique challenges and deliver tailored solutions
            that drive real results.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.sectionText}>
            To empower businesses with cutting-edge solutions that drive growth,
            efficiency, and success. We are committed to building lasting
            partnerships with our clients and helping them achieve their goals.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <div className={styles.values}>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Excellence</h3>
              <p className={styles.valueDescription}>
                We strive for excellence in everything we do, setting high
                standards and exceeding expectations.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Innovation</h3>
              <p className={styles.valueDescription}>
                We embrace new technologies and creative solutions to solve
                complex challenges.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Integrity</h3>
              <p className={styles.valueDescription}>
                We conduct business with honesty, transparency, and ethical
                practices.
              </p>
            </div>
            <div className={styles.valueCard}>
              <h3 className={styles.valueTitle}>Partnership</h3>
              <p className={styles.valueDescription}>
                We build strong relationships with our clients, working together
                as trusted partners.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

