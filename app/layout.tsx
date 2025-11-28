import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CookieBanner from '@/components/CookieBanner'

export const metadata: Metadata = {
  title: 'Edjus - Home',
  description: 'Welcome to Edjus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <CookieBanner />
      </body>
    </html>
  )
}

