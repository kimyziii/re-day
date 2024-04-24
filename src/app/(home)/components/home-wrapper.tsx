'use client'
import HomeTomorrow from '@/app/(home)/components/home-tomorrow'
import UserContext from '@/app/(shared)/context/userContext'
import { formatDate } from '@/app/(shared)/util/formatDate'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { getTodos } from '../service/todos'
import HomeToday from './home-today'

const HomeWrapper: React.FC = () => {
  const { data: session } = useSession()
  const { user } = useContext(UserContext)
  const userId = user.id

  const [currentDate, setCurrentDate] = useState<Date>(new Date())

  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)
  const tomorrowStr = formatDate(tomorrow, 'yyyyMMdd')

  const { data: todos } = useQuery({
    queryKey: ['todos', userId, tomorrowStr],
    queryFn: () => getTodos({ userId, targetDate: tomorrowStr || '' }),
    enabled: !!userId && !!tomorrowStr,
  })

  if (!session) return <>isLoading...</>

  return (
    <div className='w-full h-[90vh] bg-background flex flex-row justify-center mt-[5vh]'>
      <div className='w-[95%] grid grid-cols-2 place-items-center gap-4 laptop:grid-cols-3 desktop:grid-cols-3'>
        <HomeToday
          todos={todos}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        >
        </HomeToday>
        <HomeTomorrow
          todos={todos}
          currentDate={currentDate}
          className='hidden desktop:block laptop:block'
        />
      </div>
    </div>
  )
}

export default HomeWrapper
