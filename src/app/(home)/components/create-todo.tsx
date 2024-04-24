import { Button } from '@/app/(shared)/components/button'
import { Input } from '@/app/(shared)/components/input'
import UserContext from '@/app/(shared)/context/userContext'
import { formatDate } from '@/app/(shared)/util/formatDate'
import { ITodo } from '@/models/todo'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { ChangeEvent, useContext, useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import { createTodo, deleteTodo } from '../service/todo'

const CreateTodo = ({
  currentDate,
  todos,
}: {
  currentDate: Date
  todos: ITodo[]
}) => {
  const { user } = useContext(UserContext)
  const userId = user.id
  const queryClient = useQueryClient()

  const tomorrow = new Date(currentDate)
  tomorrow.setDate(currentDate.getDate() + 1)

  const [content, setContent] = useState<string>('')
  const tomorrowStr = formatDate(tomorrow, 'yyyyMMdd')
  console.log(tomorrow, tomorrowStr)

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
    <div className='w-full mx-auto space-y-3'>
      <div className='flex mx-auto gap-2'>
        <Input
          value={content || ''}
          onChange={(e) => handleChangeInput(e)}
          className='px-2'
        />
        <Button onClick={() => handleSaveTodo()} className='min-w-[50px]'>
          저장
        </Button>
      </div>

      <div className='w-full'>
        {!todos && (
          <div className='py-4 bg-muted mx-auto text-center text-sm rounded-md'>
            내일의 할 일이 계획되지 않았습니다.
            <br /> 계획을 등록해주세요.
          </div>
        )}
        {!!todos && (
          <div className='space-y-1 max-h-[35vh] overflow-y-auto laptop:max-h-[80svh] desktop:max-h-[80svh] mb-3'>
            {todos.map((todo: ITodo) => {
              return (
                <div
                  key={todo._id?.toString()}
                  className='flex flex-row items-start justify-between gap-2'
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
    </div>
  )
}

export default CreateTodo
