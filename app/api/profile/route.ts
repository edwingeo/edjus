import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const BACKEND_PROFILE_URL = 'https://edjus-backend-1.onrender.com/auth/profile'

export async function GET() {
  const token = (await cookies()).get('token')?.value

  if (!token) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
  }

  try {
    const res = await fetch(BACKEND_PROFILE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      const message = data?.message || `Request failed: ${res.status} ${res.statusText}`
      return NextResponse.json({ message }, { status: res.status })
    }

    return NextResponse.json(data)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ message: `Network error: ${message}` }, { status: 500 })
  }
}
