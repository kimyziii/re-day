'use client'
import HomeToday from '@/app/(home)/components/home-today'
import HomeTomorrow from '@/app/(home)/components/home-tomorrow'
import React from 'react'

const HomePage: React.FC = () => {
  return (
    <div className='w-full h-[80vh] bg-background flex flex-row justify-center mt-[10vh]'>
      <div className='w-[90%] grid grid-cols-3 place-items-center gap-4'>
        <HomeToday />
        <HomeTomorrow />
      </div>
    </div>
  )
}

export default HomePage
