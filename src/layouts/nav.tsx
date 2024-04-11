'use client'
import Backdrop from '@/app/(shared)/components/backdrop'
import CommandComponent from '@/app/(search)/components/command'
import UserContext from '@/app/(shared)/context/userContext'
import { IUser } from '@/models/user'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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

  const [isOpen, setIsOpen] = useState(false)
  const [portalElem, setPortalElem] = useState<Element | null>(null)

  const { data: session } = useSession()
  const { setUser } = useContext(UserContext)

  const handleSearchOpen = () => {
    setIsOpen((isOpen) => !isOpen)
  }

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

  useEffect(() => {
    setPortalElem(document.getElementById('portal'))
  }, [isOpen])

  const Modal = () => {
    return (
      <>
        <Backdrop handleCancel={handleSearchOpen} />
        <CommandComponent />
      </>
    )
  }

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
        <AiOutlineSearch
          size={22}
          color='white'
          className='cursor-pointer'
          onClick={handleSearchOpen}
        />
        {isOpen && portalElem ? createPortal(<Modal />, portalElem) : null}
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
