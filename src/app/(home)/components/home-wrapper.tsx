'use client'
import HomeToday from '@/app/(home)/components/home-today'
import HomeTomorrow from '@/app/(home)/components/home-tomorrow'
import { IUser } from '@/app/models/user'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const HomeWrapper: React.FC = () => {
  const router = useRouter()
  const { data: session } = useSession()

  const [userId, setUserId] = useState<string>('')
  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  useEffect(() => {
    if (session && session.user) {
      const userId = (session.user as IUser)._id
      if (userId) setUserId(userId.toString())
    } else if (session === null) {
      router.push('/login')
    }
  }, [session])

  if (!session) return <>isLoading...</>

  return (
    <div className='w-full h-[90vh] bg-background flex flex-row justify-center mt-[5vh]'>
      <div className='w-[95%] grid grid-cols-3 place-items-center gap-4'>
        <HomeToday
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          userId={userId}
        />
        <HomeTomorrow currentDate={currentDate} />
      </div>
    </div>
  )
}

export default HomeWrapper
