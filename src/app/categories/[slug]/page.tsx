'use client'
import UserContext from '@/app/(shared)/context/userContext'
import { ICategoryItem } from '@/models/categoryItem'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { DataTable } from '../components/ActivityTable'
import { columns } from '../components/columns'
import { getActivitiesByCategory } from '../services/activities'

type CategoryPageProps = {
  params: {
    slug: string
  }
}

const CategoryPage = ({ params }: CategoryPageProps) => {
  const router = useRouter()
  const categoryId = params.slug
  const { user } = useContext(UserContext)
  const userId = user.id

  const { data: activities } = useQuery({
    queryKey: ['activities', categoryId, userId],
    queryFn: () => getActivitiesByCategory({ categoryId, userId }),
    enabled: !!userId && !!categoryId,
  })

  const categoryDetail: ICategoryItem = activities
    ? activities[0].categoryId
    : null

  return (
    <div className='flex flex-col w-[90%] mx-auto h-[90svh] bg-background justify-start mt-[5vh] space-y-2'>
      {/* 뒤로 돌아가기 */}
      <div
        className='flex flex-row items-center justify-start h-fit underline cursor-pointer mb-3'
        onClick={() => {
          router.back()
        }}
      >
        <MdKeyboardArrowLeft size={18} />
        <div>카테고리로 돌아가기</div>
      </div>

      {/* 카테고리 정보 */}
      <div className='px-5 py-2'>
        {categoryDetail && (
          <div className='flex items-center justify-start text-3xl space-x-3 px-2 mb-4'>
            <p>{categoryDetail.label}</p>
            <p className='font-semibold'>{categoryDetail.value}</p>
          </div>
        )}

        {/* 카테고리로 분류된 활동 데이터 테이블 */}
        {activities && <DataTable columns={columns} data={activities} />}
      </div>
    </div>
  )
}

export default CategoryPage
