'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/(shared)/components/card'
import AtvtSection from './../../(shared)/components/section'
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from 'react-icons/io'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getActivities } from '../service/activities'
import { formatDate } from '@/app/(shared)/util/formatDate'
import { IoCloseOutline } from 'react-icons/io5'
import { deleteAtvt } from '../service/activity'
import Alert from '@/app/(shared)/components/alertDialog'
import { useContext } from 'react'
import UserContext from '@/app/(shared)/context/userContext'
import HomeTodoDialog from './home-todo-dialog'

interface HomeTodayProps {
  currentDate: Date
  setCurrentDate: (prevDate: Date) => void
}

const HomeToday = ({ currentDate, setCurrentDate }: HomeTodayProps) => {
  const queryClient = useQueryClient()
  const dailyDate = formatDate(currentDate, 'yyyyMMdd') as string

  const { user } = useContext(UserContext)
  const userId = user.id

  const { data: activities } = useQuery<any[], boolean>({
    queryKey: ['activities', userId, dailyDate],
    queryFn: () => getActivities({ userId, dailyDate }),
    enabled: !!userId && !!dailyDate,
  })

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteAtvt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activities', userId, dailyDate],
      })
    },
  })

  const handleDeleteActivity = (atvtId: string) => {
    mutateDelete(atvtId)
  }

  return (
    <Card className='w-full h-full col-span-2 overflow-y-auto text-center'>
      <CardHeader className='flex flex-row justify-evenly items-center'>
        <div className='flex justify-start items-center px-2 py-1 bg-secondary rounded-md'>
          <HomeTodoDialog dailyDate={dailyDate} />
        </div>
        <div className='w-[80%] flex items-center justify-evenly'>
          <IoMdArrowDropleftCircle
            className='cursor-pointer'
            onClick={() => {
              const prevDate = new Date(currentDate)
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
              const nextDate = new Date(currentDate)
              nextDate.setDate(currentDate.getDate() + 1)
              setCurrentDate(nextDate)
            }}
          />
        </div>
        <div
          onClick={() => setCurrentDate(new Date())}
          className='text-xs px-2 py-1 bg-secondary font-semibold rounded-md cursor-pointer'
        >
          TODAY
        </div>
      </CardHeader>
      <CardContent className='space-y-2'>
        <AtvtSection currentDate={currentDate} userId={userId} />
        {!!activities && (
          <div className='space-y-2'>
            {activities.map((atvt) => {
              return (
                <div key={atvt._id} className='flex w-full gap-4 pl-2'>
                  <div className='w-fit mt-[5px]'>
                    {atvt.categoryId?.label || '💬'}
                  </div>
                  <div className='w-full relative'>
                    <div className='card-triangle-arrow' />
                    <Card className='w-full mx-auto border-none bg-muted'>
                      <CardContent
                        key={atvt._id}
                        className='text-left px-2 py-[6px] space-y-[6px]'
                      >
                        <div className='text-sm border-b pb-1 flex justify-between items-center px-2'>
                          <span className='font-semibold'>{atvt.summary}</span>
                          <Alert
                            title='삭제하시겠습니까?'
                            description='한 번 활동을 삭제하면 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
                            confirmFunc={() => handleDeleteActivity(atvt._id)}
                          >
                            <IoCloseOutline size={16} />
                          </Alert>
                        </div>
                        <div className='text-sm font-light whitespace-pre-line break-all text-justify px-2'>
                          {atvt.contents}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default HomeToday
