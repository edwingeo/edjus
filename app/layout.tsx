import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CookieBanner from '@/components/CookieBanner'
import Script from 'next/script';

<Script src='https://www.noupe.com/embed/019ae10abca673f3adff9077d02d76cff233.js'></Script>

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

