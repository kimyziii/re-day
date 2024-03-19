'use client'
import { SessionProvider as SessionProviderComponent } from 'next-auth/react'
const SessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode
  session: any
}) => {
  return (
    <SessionProviderComponent session={session}>
      {children}
    </SessionProviderComponent>
  )
}

export default SessionProvider
