'use client'
import UserContext from '@/app/(shared)/context/userContext'
import { IUser } from '@/models/user'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineUnorderedList,
  AiFillSetting,
} from 'react-icons/ai'

const NavBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const returnNullArr = ['/login', '/signup']

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

  if (returnNullArr.includes(pathname)) return null

  return (
    <div className='flex flex-col justify-between items-center w-[60px] h-[100vh] bg-secondary-foreground text-white px-3 py-6'>
      <div className='space-y-6'>
        <AiOutlineHome
          size={22}
          color='white'
          className='cursor-pointer'
          onClick={() => router.push('/')}
        />
        <AiOutlineSearch size={22} color='white' />
        <AiOutlineUnorderedList size={22} color='white' />
      </div>
      <div>
        <AiFillSetting
          size={22}
          color='white'
          className='cursor-pointer'
          onClick={() => router.push(`/settings`)}
        />
      </div>
    </div>
  )
}

export default NavBar
