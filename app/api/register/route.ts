import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://edjus-backend-1.onrender.com/auth/register'

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { userName, password, role} = body || {}

  if (!userName || !password) {
    return NextResponse.json({ message: 'Username and password are required' }, { status: 400 })
  }

  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: userName, password, roles: [role] }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    return NextResponse.json({ message: data?.message || 'Invalid credentials' }, { status: res.status })
  }

  if (!data?.access_token) {
    return NextResponse.json({ message: 'No access token returned' }, { status: 500 })
  }

  const response = NextResponse.json({ access_token: data.access_token })
  return response
}
