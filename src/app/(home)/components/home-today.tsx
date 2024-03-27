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

interface HomeTodayProps {
  currentDate: Date
  setCurrentDate: (prevDate: Date) => void
  userId: string
}

const HomeToday = ({ currentDate, setCurrentDate, userId }: HomeTodayProps) => {
  const queryClient = useQueryClient()
  const dailyDate = formatDate(currentDate, 'yyyyMMdd') as string

  const { data: activities } = useQuery<any[], boolean>({
    queryKey: ['activities', userId, dailyDate],
    queryFn: () => getActivities({ userId, dailyDate }),
    enabled: userId !== '' && dailyDate !== '',
  })

  const { mutate } = useMutation({
    mutationFn: deleteAtvt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activities', userId, dailyDate],
      })
    },
  })

  const handleDeleteActivity = (atvtId: string) => {
    mutate(atvtId)
  }

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
        <AtvtSection currentDate={currentDate} userId={userId} />
        {activities && (
          <div className='space-y-2'>
            {activities.map((atvt) => {
              return (
                <div key={atvt._id} className='flex w-full gap-4 pl-2'>
                  <div className='w-fit mt-[5px]'>{atvt.categoryId.label}</div>
                  <div className='w-full relative'>
                    <div className='card-triangle-arrow' />
                    <Card className='w-full mx-auto border-none bg-muted'>
                      <CardContent
                        key={atvt._id}
                        className='text-left px-2 py-[6px] space-y-[6px]'
                      >
                        <div className='text-sm border-b pb-1 flex justify-between items-center'>
                          <span className='font-semibold'>{atvt.summary}</span>
                          <Alert
                            title='삭제하시겠습니까?'
                            description='한 번 활동을 삭제하면 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?'
                            confirmFunc={() => handleDeleteActivity(atvt._id)}
                          >
                            <IoCloseOutline size={16} />
                          </Alert>
                        </div>
                        <div className='text-sm font-light whitespace-pre-line text-justify'>
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
