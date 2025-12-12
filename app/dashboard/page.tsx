'use client'

import  { useEffect, useState } from 'react'

type Query = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt?: string
}

 function DashboardPage() {
  const [queries, setQueries] = useState<Query[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/dashboard')
        if (!res.ok) throw new Error(`Status ${res.status}`)
        const data = await res.json()
        setQueries(data.data)
      } catch (err: any) {
        setError(err.message || 'Failed to load queries')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      {/* <Header /> */}
      <main style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
        <h1>Customer Queries</h1>

        {loading && <p>Loading...</p>}
        {error && (
          <p style={{ color: 'crimson' }}>
            Error: {error}
          </p>
        )}

        {!loading && !error && (!queries || queries.length === 0) && (
          <p>No queries found.</p>
        )}

        {!loading && !error && queries && queries.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Email</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Subject</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Message</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 8 }}>Received</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((q) => (
                <tr key={q.id}>
                  <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{q.name}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{q.email}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{q.subject}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{q.message}</td>
                  <td style={{ padding: 8, borderBottom: '1px solid #f1f1f1' }}>{q.createdAt ? new Date(q.createdAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}
export default DashboardPage;
