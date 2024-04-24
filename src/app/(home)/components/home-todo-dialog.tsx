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
import CreateTodo from './create-todo'
import { ITodo } from '@/models/todo'

type HomeTodoDialogProps = {
  date: string | Date
  type: 'today' | 'tomorrow'
  todos: ITodo[]
}

const HomeTodoDialog = ({ date, type, todos }: HomeTodoDialogProps) => {
  const { user } = useContext(UserContext)
  const userId = user.id
  const queryClient = useQueryClient()

  // 오늘의 투두리스트 가져오기
  const { data: todaysTodo } = useQuery<any[], boolean>({
    queryKey: ['todos', userId, date],
    queryFn: () => getTodos({ userId, targetDate: date.toString() }),
    enabled: !!userId,
  })

  // 오늘의 투두리스트에서 투두의 상태 바꿀 시 다시 가져오기
  const { mutate: mutateChangeTodoStatus } = useMutation({
    mutationFn: changeTodoStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos', userId, date],
      })
    },
  })

  // 오늘의 투두리스트 컴포넌트
  const TodayDialog = () => {
    return (
      <div className='top-[20%] space-y-3'>
        <DialogHeader>
          <DialogTitle className='text-left'>오늘 하기로 한 것들</DialogTitle>
        </DialogHeader>
        <div className='text-left space-y-2 max-h-[35vh] overflow-y-auto laptop:max-h-[80svh] desktop:max-h-[80svh]'>
          {todaysTodo?.map((todo) => {
            const className = todo.isSuccess ? 'line-through' : ''
            return (
              <div
                key={todo._id}
                className='flex justify-start items-start space-x-2'
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
          {!todaysTodo && (
            <div className='mt-3 text-sm'>등록된 TO-DO가 없습니다.</div>
          )}
        </div>
      </div>
    )
  }

  // 내일 투두리스트 컴포넌트
  const TomorrowDialog = () => {
    return (
      <div className='space-y-6'>
        <DialogHeader>
          <DialogTitle className='text-left'>내일 할 것들</DialogTitle>
        </DialogHeader>
        <div className='w-full text-left space-y-2'>
          <CreateTodo currentDate={new Date(date)} todos={todos} />
        </div>
      </div>
    )
  }

  const handleChangeTodoStatus = (todoStatus: boolean, todoId: string) => {
    mutateChangeTodoStatus({ todoStatus, todoId })
  }

  return (
    <Dialog>
      <DialogTrigger>
        <LuListTodo size={16} />
      </DialogTrigger>
      <DialogContent className='fixed max-w-[400px] rounded-md'>
        {type === 'today' && <TodayDialog />}
        {type === 'tomorrow' && <TomorrowDialog />}
      </DialogContent>
    </Dialog>
  )
}

export default HomeTodoDialog
