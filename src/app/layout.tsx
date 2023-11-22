import './globals.css'
import type { Metadata } from 'next'
import NextAuthSessionProvider from '@/providers/sessionProvider'

export const metadata: Metadata = {
  title: 'Banco app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}