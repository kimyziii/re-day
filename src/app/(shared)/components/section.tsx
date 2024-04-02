'use client'
import { ICategoryItem } from '@/app/models/categoryItem'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Button } from './button'
import { Card } from './card'
import { Input } from './input'
import { Textarea } from './textarea'
import { addAtvt } from '@/app/(home)/service/activity'
import { formatDate } from '../util/formatDate'
import { Types } from 'mongoose'
import Categories from './categories'

export const initialCategory = {
  _id: new Types.ObjectId(),
  value: '카테고리',
  label: '카테고리',
  userId: new Types.ObjectId(),
}

function AtvtSection({
  currentDate,
  userId,
}: {
  currentDate: Date
  userId: string
}) {
  const [summary, setSummary] = useState('')
  const [contents, setContents] = useState('')
  const [category, setCategory] = useState<ICategoryItem>(initialCategory)

  const queryClient = useQueryClient()
  const dailyDate = formatDate(currentDate, 'yyyyMMdd') as string

  const { mutate } = useMutation({
    mutationFn: addAtvt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['activities', userId, dailyDate],
      })
    },
  })

  const handleSaveActivity = () => {
    const newObj = {
      categoryId: new Types.ObjectId(category._id),
      summary,
      contents,
      dailyDate,
      createdById: new Types.ObjectId(userId),
    }
    mutate(newObj)

    handleSetInitialData()
  }

  const handleSetInitialData = () => {
    setCategory(() => initialCategory)
    setSummary('')
    setContents('')
  }

  return (
    <Card className='px-2 py-2 space-y-1 '>
      <div className='flex items-center gap-2'>
        <>
          <Input
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className='border-none shadow-none'
            placeholder='활동내용을 간단히 정리해 작성해 주세요.'
          />
          <Categories
            userId={userId}
            category={category}
            setCategory={setCategory}
          />
        </>
      </div>
      <Textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder='내용을 입력해 주세요.'
        className='border-none shadow-none resize-none min-h-[15vh] max-h-[30px] rounded-md'
      />
      <hr />
      <div className='text-right'>
        <Button
          onClick={() => {
            handleSaveActivity()
          }}
          size='sm'
        >
          저장
        </Button>
      </div>
    </Card>
  )
}

export default AtvtSection
