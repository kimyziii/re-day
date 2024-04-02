import React, { ChangeEvent, useContext, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/(shared)/components/table'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { FaCircleQuestion } from 'react-icons/fa6'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/app/(shared)/components/alert-dialog'

import UserContext from '@/app/(shared)/context/userContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ICategoryItem } from '@/app/models/categoryItem'
import {
  createCategoryItem,
  getCategoryItem,
} from '@/app/(home)/service/category'
import { Input } from '@/app/(shared)/components/input'
import { Button } from '@/app/(shared)/components/button'
import { HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card'
import { HoverCard } from '@/app/(shared)/components/hover-card'
import { Types } from 'mongoose'

const initialData = {
  label: '',
  value: '',
  userId: new Types.ObjectId(),
  type: 'private',
}

const CategorySettings = () => {
  const [newCategory, setNewCategory] =
    useState<Omit<ICategoryItem, '_id'>>(initialData)
  const [creationError, setCreationError] = useState<boolean>(false)

  const { user } = useContext(UserContext)
  const userId = user.id
  if (userId) newCategory.userId = userId

  const queryClient = useQueryClient()

  const { data: categories } = useQuery<ICategoryItem[], boolean>({
    queryKey: ['categoryItem', userId],
    queryFn: () => getCategoryItem(userId),
    enabled: !!userId,
  })

  const { mutate: submitCategoryItem } = useMutation({
    mutationFn: createCategoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryItem', userId],
      })
    },
    onError: () => {
      setCreationError(true)
    },
  })

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    e.preventDefault()
    setNewCategory({
      ...newCategory,
      [name]: value,
    })
  }

  return (
    <div className='mt-2 space-y-1'>
      {creationError && (
        <AlertDialog defaultOpen={true}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>에러 발생</AlertDialogTitle>
              <AlertDialogDescription>
                에러가 발생했습니다. 다시 시도해 주세요.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={() => {}}>확인</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* 카테고리 생성 라인 */}
      <div className='flex gap-2'>
        <Input
          name='label'
          value={newCategory.label}
          onChange={(e) => onChangeValue(e)}
          placeholder='라벨을 입력하세요 (예시: 🛌)'
        />
        <Input
          name='value'
          value={newCategory.value}
          onChange={(e) => onChangeValue(e)}
          placeholder='값을 입력하세요 (예시: 휴식)'
        />
        <Button
          onClick={() => {
            submitCategoryItem(newCategory)
            setNewCategory(initialData)
          }}
        >
          저장
        </Button>
      </div>

      {/* 카테고리 리스트 */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>라벨</TableHead>
            <TableHead className='w-full flex flex-row items-center gap-1'>
              <span className='font-medium'>값</span>
              <HoverCard openDelay={1}>
                <HoverCardTrigger>
                  <FaCircleQuestion />
                </HoverCardTrigger>
                <HoverCardContent side='bottom' sideOffset={8} align='center'>
                  <div className='bg-primary text-white rounded-md border border-primary px-3 py-2'>
                    중복되지 않도록 입력해주세요.
                  </div>
                </HoverCardContent>
              </HoverCard>
            </TableHead>
            <TableHead className='min-w-12 w-12 max-w-12 text-center'>
              수정
            </TableHead>
            <TableHead className='min-w-12 w-12 max-w-12 text-center'>
              삭제
            </TableHead>
          </TableRow>
        </TableHeader>
        {categories && (
          <TableBody>
            {categories.map((category) => {
              return (
                <TableRow key={category._id.toString()} className='h-10'>
                  <TableCell>{category.label}</TableCell>
                  <TableCell>{category.value}</TableCell>
                  <TableCell>
                    <div className='grid h-fit place-items-center'>
                      <FaEdit size={16} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='grid h-fit place-items-center'>
                      <FaTrashAlt size={16} />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        )}
      </Table>
    </div>
  )
}

export default CategorySettings
