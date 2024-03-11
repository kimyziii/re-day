'use client'
import { Checkbox } from './ui/checkbox'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { IoIosClose } from 'react-icons/io'

const HomeTomorrow = () => {
  const today = new Date()
  const tomorrow = new Date(today.setDate(today.getDate() + 1))

  return (
    <Card className='w-full h-full col-span-1 bg-white overflow-y-auto'>
      <CardHeader>
        <CardTitle className='font-rubik tracking-wide italic'>
          {tomorrow.toLocaleDateString()}
        </CardTitle>
        <CardDescription>
          오늘의 회고를 바탕으로 내일을 계획합니다.
        </CardDescription>
      </CardHeader>
      <div className='space-y-4'>
        <div className='flex items-center justify-between mt-1 px-6'>
          <div className='flex items-center justify-between space-x-2'>
            <Checkbox id='todo' />
            <label
              htmlFor='todo'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Accept terms and conditions
            </label>
          </div>
          <div>
            <IoIosClose />
          </div>
        </div>
        <div className='flex items-center justify-between mt-1 px-6'>
          <div className='flex items-center justify-between space-x-2'>
            <Checkbox id='todo' />
            <label
              htmlFor='todo'
              className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              Accept terms and conditions
            </label>
          </div>
          <div>
            <IoIosClose />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default HomeTomorrow
