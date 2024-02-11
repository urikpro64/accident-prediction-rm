import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TopNav } from './components/Top-Nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Accident',
  description: 'Created by Vachirakorn & Tanaset ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col w-full h-screen">
          <TopNav />
          {children}
        </div>
      </body>
    </html>
  )
}
