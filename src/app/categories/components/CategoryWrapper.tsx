'use client'
import UserContext from '@/app/(shared)/context/userContext'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { getCountByCategories } from '../services/activities'
import CategoryCard from './CategoryCard'

export type CountByCategoryType = {
  count: number
  label: string
  value: string
  lastDate: string
  _id: string
}

const CategoryWrapper = () => {
  const { user } = useContext(UserContext)
  const userId = user.id

  const { data: categoryCounts, isLoading } = useQuery({
    queryKey: ['activitiesByCategory', userId],
    queryFn: () => getCountByCategories({ userId }),
    enabled: !!userId,
  })

  return (
    <div className='w-full min-h-fit h-fit max-h-full p-2 rounded-lg overflow-y-auto grid grid-cols-3 gap-3'>
      {isLoading && <div>데이터가 없습니다.</div>}
      {!!categoryCounts &&
        categoryCounts.map((category: CountByCategoryType) => {
          return <CategoryCard key={category._id} category={category} />
        })}
    </div>
  )
}

export default CategoryWrapper
