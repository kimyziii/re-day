'use client'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(shared)/components/card'
import { IoIosClose } from 'react-icons/io'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useContext, useState } from 'react'
import UserContext from '@/app/(shared)/context/userContext'
import { createTodo, deleteTodo } from '../service/todo'
import { formatDate } from '@/app/(shared)/util/formatDate'
import { getTodos } from '../service/todos'
import { ITodo } from '@/models/todo'
import { Input } from '@/app/(shared)/components/input'
import { Button } from '@/app/(shared)/components/button'

const HomeTomorrow = ({ currentDate }: { currentDate: Date }) => {
  const { user } = useContext(UserContext)
  const userId = user.id
  const queryClient = useQueryClient()

  const [content, setContent] = useState<string>('')

  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)

  const tomorrowStr = formatDate(tomorrow, 'yyyyMMdd')

  const { data: todos } = useQuery({
    queryKey: ['todos', userId, tomorrowStr],
    queryFn: () => getTodos({ userId, targetDate: tomorrowStr || '' }),
    enabled: !!userId && !!tomorrowStr,
  })

  const { mutate: mutateCreate } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', userId, tomorrowStr],
      })
    },
  })

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', userId, tomorrowStr],
      })
    },
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setContent(() => e.target.value)
  }

  const handleSaveTodo = async () => {
    const obj = {
      todoDate: tomorrowStr,
      content,
      userId,
      isSuccess: false,
    }
    mutateCreate(obj)
    setContent(() => '')
  }

  return (
    <Card className='w-full h-full col-span-1 bg-white overflow-y-auto'>
      <CardHeader>
        <CardTitle className='font-rubik tracking-wide italic'>
          {tomorrow.toLocaleDateString()}
        </CardTitle>
        <CardDescription>회고를 바탕으로 다음날을 계획합니다.</CardDescription>
      </CardHeader>
      <div className='space-y-2'>
        <div className='flex w-[90%] mx-auto gap-2'>
          <Input
            value={content || ''}
            onChange={(e) => handleChangeInput(e)}
            className='px-2'
          />
          <Button onClick={() => handleSaveTodo()} className='min-w-[50px]'>
            저장
          </Button>
        </div>
        {!todos && (
          <div className='w-[90%] py-4 bg-muted mx-auto text-center text-sm rounded-md'>
            내일의 할 일이 계획되지 않았습니다.
            <br /> 계획을 등록해주세요.
          </div>
        )}
        {!!todos && (
          <div className='space-y-1'>
            {todos.map((todo: ITodo) => {
              return (
                <div
                  key={todo._id?.toString()}
                  className='flex flex-row items-start justify-between px-6 gap-2 first:mt-4'
                >
                  <div className='flex items-start justify-between space-x-2'>
                    <div>• </div>
                    <label
                      htmlFor='todo'
                      className='mt-[5px] text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {todo.content}
                    </label>
                  </div>
                  <div className='flex mt-1'>
                    <IoIosClose
                      className='cursor-pointer'
                      onClick={() => {
                        mutateDelete(String(todo._id))
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </Card>
  )
}

export default HomeTomorrow
