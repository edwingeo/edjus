'use client'

import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import styles from './page.module.css'

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  useEffect(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setError(null)
      setSuccess(null)
  }, [])

  const validate = () => {
    if (!formData.name) return 'Name is required'
    if (!formData.email) return 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Enter a valid Email'
    if (!formData.subject) return 'Subject is required'
    return null
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setSuccess('Successfully registered your inquiry. Our team will contact you soon!')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        setError(data?.message || 'Invalid credentials')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Contact Us</h1>
          <p className={styles.subtitle}>
            We&apos;d love to hear from you. Get in touch with us today.
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📧</div>
            <h3 className={styles.infoTitle}>Email</h3>
            <p className={styles.infoText}>info@edjus.ca</p>
          </div>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>📱</div>
            <h3 className={styles.infoTitle}>Phone</h3>
            <p className={styles.infoText}>Edwin George : +1 (365) 378-2991</p>
            <p className={styles.infoText}>Justin Jacob : +1 (306) 262-2648</p>
          </div>
        </div>
        
        {error && (
          <div className={`${styles.statusMessage} ${styles.error}`} role="alert">
            {error}
          </div>
        )}
        {success && (
          <div className={`${styles.statusMessage} ${styles.success}`} role="alert">
            {success}
          </div>
        )}


        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="subject" className={styles.formLabel}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={styles.formInput}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message" className={styles.formLabel}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={styles.formTextarea}
              required
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
            aria-busy={loading}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
