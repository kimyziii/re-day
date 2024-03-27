import UserContext from '@/app/(shared)/context/userContext'
import { IUser } from '@/app/models/user'
import { useSession } from 'next-auth/react'
import { useContext, useEffect } from 'react'
  const { data: session } = useSession()
  const { setUser } = useContext(UserContext)
  useEffect(() => {
    if (session && session.user) {
      const userId = (session.user as IUser)._id
      if (userId)
        setUser({
          email: session.user.email,
          nickname: session.user.name,
          id: userId,
        })
    } else if (session === null) {
      router.push('/login')
    }
  }, [session])
