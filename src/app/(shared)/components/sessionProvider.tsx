'use client'
import { SessionProvider as SessionProviderComponent } from 'next-auth/react'
const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProviderComponent>{children}</SessionProviderComponent>
}

export default SessionProvider
