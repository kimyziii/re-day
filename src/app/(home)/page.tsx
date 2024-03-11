'use client'
import HomeToday from '@/components/home-today'
import HomeTomorrow from '@/components/home-tomorrow'

const HomePage = () => {
  return (
    <div className='w-full h-[100vh] bg-background flex flex-row justify-center items-center'>
      <div className='desktop:w-[1476px] laptop:w-[1220px] tablet:w-[964px] mobile:w-[580px] h-[80vh] grid grid-cols-3 place-items-center gap-4'>
        <HomeToday />
        <HomeTomorrow />
      </div>
    </div>
  )
}

export default HomePage
