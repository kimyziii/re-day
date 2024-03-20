'use client'
import { Button } from '@/app/(shared)/components/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(shared)/components/card'
import AtvtSection from './../../(shared)/components/section'
import { PiPlusCircleThin } from 'react-icons/pi'
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from 'react-icons/io'

interface HomeTodayProps {
  currentDate: Date
  setCurrentDate: (prevDate: Date) => void
}

const HomeToday = ({ currentDate, setCurrentDate }: HomeTodayProps) => {
  return (
    <Card className='w-full h-full col-span-2 overflow-y-auto text-center'>
      <CardHeader className='flex flex-row justify-evenly items-center'>
        <IoMdArrowDropleftCircle
          className='cursor-pointer'
          onClick={() => {
            const prevDate = new Date()
            prevDate.setDate(currentDate.getDate() - 1)
            setCurrentDate(prevDate)
          }}
        />
        <div>
          <CardTitle className='font-rubik tracking-wide italic'>
            {currentDate.toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              weekday: 'short',
            })}
          </CardTitle>
          <CardDescription>하루를 회고합니다.</CardDescription>
        </div>
        <IoMdArrowDroprightCircle
          className='cursor-pointer'
          onClick={() => {
            const nextDate = new Date()
            nextDate.setDate(currentDate.getDate() + 1)
            setCurrentDate(nextDate)
          }}
        />
      </CardHeader>
      <CardContent className='space-y-2'>
        <AtvtSection />
        <Button variant='outline' className='w-full h-[40px] '>
          <PiPlusCircleThin
            color='black'
            size={25}
            className='hover:color-white'
          />
        </Button>
      </CardContent>
    </Card>
  )
}

export default HomeToday
