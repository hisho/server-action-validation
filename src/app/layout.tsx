import type { Metadata } from 'next'

import '@/app/globals.css'
import Link from 'next/link'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  description: 'Generated by create next app',
  title: 'Create Next App',
}

type Props = {
  children: ReactNode
}

export default function ({ children }: Props) {
  return (
    <html>
      <body>
        <header>
          <Link href={'/'}>Home</Link>
        </header>
        {children}
      </body>
    </html>
  )
}
