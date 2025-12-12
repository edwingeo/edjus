import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://edjus-backend-1.onrender.com/contacts'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const page = Math.max(Number.parseInt(searchParams.get('page') || '1', 10) || 1, 1)
  const limit = Math.max(Number.parseInt(searchParams.get('limit') || '10', 10) || 10, 1)

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  const res = await fetch(`${BACKEND_URL}?${params.toString()}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    return NextResponse.json({ message: data?.message || 'Failed to fetch contacts' }, { status: res.status })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const { name, email, subject, message } = body || {}

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ message: 'Name, email, subject and message are required' }, { status: 400 })
  }

  const res = await fetch(BACKEND_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, subject, message }),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    return NextResponse.json({ message: data?.message}, { status: res.status })
  } 

  const response = NextResponse.json({ success: true })
  

  return response
}