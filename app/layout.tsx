import type { Metadata } from 'next'
import './globals.css'
import { Nanum_Gothic } from 'next/font/google'

const nanumGothic = Nanum_Gothic({
  subsets: ['latin'],
  weight: '400'
})


export const metadata: Metadata = {
  title: 'Förankrad Konferensen',
  description: 'För unga vuxna som vill bli mer förankrade i sin tro på Jesus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nanumGothic.className}>{children}</body>
    </html>
  )
}
