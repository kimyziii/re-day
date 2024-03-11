'use client'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import AtvtSection from './ui/section'
import { PiPlusCircleThin } from 'react-icons/pi'

const HomeToday = () => {
  return (
    <Card className='w-full h-full col-span-2 overflow-y-auto'>
      <CardHeader>
        <CardTitle className='font-rubik tracking-wide italic'>
          {new Date().toLocaleDateString()}
        </CardTitle>
        <CardDescription>오늘 하루를 회고합니다.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-3'>
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
