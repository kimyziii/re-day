'use client'
import { Card } from '@/app/(shared)/components/card'
import { formatStringToDate } from '@/app/(shared)/util/formatDate'
import { CountByCategoryType } from './CategoryWrapper'

const CategoryCard = ({ category }: { category: CountByCategoryType }) => {
  const { count, value: name, label, _id, lastDate } = category
  return (
    <Card className='flex flex-col justify-between min-h-fit h-[100px] max-h-[300px] overflow-hidden px-3 py-2'>
      <div className='flex justify-between items-start'>
        <div>
          <div className='text-2xl font-semibold'>{name}</div>
          <div className='text-sm'>활동 개수: {count}</div>
        </div>
        <div className='text-2xl'>{label}</div>
      </div>
      <div className='text-xs text-left'>
        마지막 활동일자: {formatStringToDate(lastDate)}
      </div>
    </Card>
  )
}

export default CategoryCard
