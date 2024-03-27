'use client'
import { getCategoryItem } from '@/app/(home)/service/category'
import { ICategoryItem } from '@/app/models/categoryItem'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Button } from './button'
import { Card } from './card'
import { Input } from './input'
import { Textarea } from './textarea'
import { addAtvt } from '@/app/(home)/service/activity'
import { formatDate } from '../util/formatDate'
import { Types } from 'mongoose'

const initialCategory = {
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

  const { data: categories, isLoading } = useQuery<ICategoryItem[], boolean>({
    queryKey: ['categoryItem', userId],
    queryFn: () => getCategoryItem(userId),
    enabled: userId !== '',
  })

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

  if (isLoading) return <>isLoading..</>

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
          {categories && (
            <div>
              <Select
                value={category.label}
                onValueChange={(value) => {
                  const category = categories.filter(
                    (category: ICategoryItem) => {
                      return category._id?.toString() === value
                    },
                  )[0]
                  setCategory(() => category)
                }}
              >
                <SelectTrigger className='w-[100px] py-1 rounded-lg text-sm bg-accent text-black focus:outline-none'>
                  <SelectValue aria-label={category.value}>
                    {category.label}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className='flex items-center w-[100px] rounded-lg overflow-hidden'>
                  {categories.map((category) => {
                    return (
                      <SelectItem
                        key={category.value}
                        className='w-[100px] text-center bg-slate-100 hover:bg-primary hover:text-white py-1 focus:outline-none'
                        value={category._id.toString()}
                        data-value={category.value}
                      >
                        {category.label}
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          )}
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
