'use client'

import React, { useState } from 'react'
import UserContext from './userContext'

export default function UserContextProvider({
  children,
}: React.PropsWithChildren) {
  const [user, setUser] = useState<string>('')

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
