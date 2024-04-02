'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/(shared)/components/dialog'

import { getTodos } from '../service/todos'
import { changeTodoStatus } from '../service/todo'

import { LuListTodo } from 'react-icons/lu'
import { Checkbox } from '@/app/(shared)/components/checkbox'
import { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import UserContext from '@/app/(shared)/context/userContext'

type HomeTodoDialogProps = {
  dailyDate: string
}

const HomeTodoDialog = ({ dailyDate }: HomeTodoDialogProps) => {
  const { user } = useContext(UserContext)
  const userId = user.id
  const queryClient = useQueryClient()

  const { data: todos } = useQuery<any[], boolean>({
    queryKey: ['todos', userId, dailyDate],
    queryFn: () => getTodos({ userId, targetDate: dailyDate }),
  })

  const { mutate: mutateChangeTodoStatus } = useMutation({
    mutationFn: changeTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', userId, dailyDate],
      })
    },
  })

  const handleChangeTodoStatus = (todoStatus: boolean, todoId: string) => {
    mutateChangeTodoStatus({ todoStatus, todoId })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <LuListTodo size={16} />
      </DialogTrigger>
      <DialogContent className='absolute max-w-[400px] top-[20svh] rounded-md'>
        <DialogHeader>
          <DialogTitle className='text-left'>오늘 하기로 한 것들</DialogTitle>
          <div className='text-left space-y-2'>
            {todos?.map((todo) => {
              const className = todo.isSuccess ? 'line-through' : ''
              return (
                <div
                  key={todo._id}
                  className='first:mt-3 flex justify-start items-start space-x-2'
                >
                  <Checkbox
                    checked={todo.isSuccess}
                    onClick={() => {
                      handleChangeTodoStatus(todo.isSuccess, todo._id)
                    }}
                    className='flex justify-center items-center mt-[3px]'
                  />
                  <div className={`text-sm ${className}`}>{todo.content}</div>
                </div>
              )
            })}
            {!todos && (
              <div className='mt-3 text-sm'>등록된 TO-DO가 없습니다.</div>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default HomeTodoDialog
