'use client'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(shared)/components/card'
import { ITodo } from '@/models/todo'
import CreateTodo from './create-todo'

const HomeTomorrow = ({
  currentDate,
  className,
  todos,
}: {
  currentDate: Date
  className?: string
  todos: ITodo[]
}) => {
  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)

  return (
    <Card
      className={`${className} w-full h-full col-span-1 bg-white overflow-y-auto`}
    >
      <CardHeader>
        <CardTitle className='font-rubik tracking-wide italic'>
          {tomorrow.toLocaleDateString()}
        </CardTitle>
        <CardDescription>회고를 바탕으로 다음날을 계획합니다.</CardDescription>
      </CardHeader>
      <div className='w-[90%] mx-auto space-y-2'>
        <CreateTodo currentDate={currentDate} todos={todos} />
      </div>
    </Card>
  )
}

export default HomeTomorrow
