'use client'
import React, { Dispatch, SetStateAction } from 'react'

import {
  Arrow,
  ScrollDownButton,
  ScrollUpButton,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Viewport,
} from '@radix-ui/react-select'
import { getCategoryItem } from '@/app/(home)/service/category'
import { useQuery } from '@tanstack/react-query'
import { ICategoryItem } from '@/app/models/categoryItem'

type CategoriesProps = {
  userId: string
  category: ICategoryItem
  setCategory: Dispatch<SetStateAction<ICategoryItem>>
  className?: string
}

const Categories = ({
  userId,
  category,
  setCategory,
  className,
}: CategoriesProps) => {
  const { data: categories, isLoading } = useQuery<ICategoryItem[], boolean>({
    queryKey: ['categoryItem', userId],
    queryFn: () => getCategoryItem(userId),
    enabled: !!userId,
  })

  if (isLoading) return <>isLoading..</>

  return (
    <div className={className}>
      {categories && (
        <div>
          <Select
            value={category.label}
            onValueChange={(value) => {
              const category = categories.filter((category: ICategoryItem) => {
                return category._id?.toString() === value
              })[0]
              if (setCategory) setCategory(() => category)
            }}
          >
            <SelectTrigger className='w-[100px] py-1 rounded-lg text-sm bg-accent text-black focus:outline-none'>
              <SelectValue aria-label={category.value}>
                {category.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className='flex items-center w-[100px]'>
              <SelectGroup className='rounded-lg overflow-y-auto max-h-[120px]'>
                <ScrollUpButton />
                <Viewport>
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
                </Viewport>
                <ScrollDownButton />
                <Arrow />
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  )
}

export default Categories
