'use client'
import HomeToday from '@/app/(home)/components/home-today'
import HomeTomorrow from '@/app/(home)/components/home-tomorrow'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const HomeWrapper: React.FC = () => {
  const { data: session } = useSession()

  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  if (!session) return <>isLoading...</>

  return (
    <div className='w-full h-[90vh] bg-background flex flex-row justify-center mt-[5vh]'>
      <div className='w-[95%] grid grid-cols-3 place-items-center gap-4'>
        <HomeToday currentDate={currentDate} setCurrentDate={setCurrentDate} />
        <HomeTomorrow currentDate={currentDate} />
      </div>
    </div>
  )
}

export default HomeWrapper
