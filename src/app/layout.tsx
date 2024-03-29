import type { Metadata } from 'next'

import '@/app/globals.css'
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
      <body>{children}</body>
    </html>
  )
}
