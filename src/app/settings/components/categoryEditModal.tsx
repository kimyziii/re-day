import { updateCategoryItem } from '@/app/(home)/service/category'
import { Button } from '@/app/(shared)/components/button'
import { Input } from '@/app/(shared)/components/input'
import { Label } from '@/app/(shared)/components/label'
import { ICategoryItem } from '@/models/categoryItem'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'

const CategoryEditModal = ({
  category,
  cancelModal,
  userId,
}: {
  category: ICategoryItem
  cancelModal: Dispatch<SetStateAction<boolean>>
  userId: string
}) => {
  const queryClient = useQueryClient()
  const [updateData, setUpdateData] = useState({
    label: category.label,
    value: category.value,
  })

  const { mutate: update } = useMutation({
    mutationFn: updateCategoryItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categoryItem', userId],
      })
    },
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdateData({ ...updateData, [name]: value })
  }

  const handleUpdate = () => {
    const data = {
      label: updateData.label,
      value: updateData.value,
      itemId: category._id.toString(),
    }
    update(data)
    cancelModal(false)
  }

  const handleCancel = () => {
    cancelModal(false)
  }

  return (
    <div className='fixed w-[30vw] h-fit left-[50%] top-[25%] translate-x-[-50%] translate-y-[-50%] z-50 bg-white rounded-md px-3 py-3 space-y-2'>
      <div className='font-semibold text-lg mb-3'>카테고리 변경</div>
      <div className='w-[90%] mx-auto flex items-center'>
        <Label className='w-[40px] text-left'>라벨</Label>
        <Input
          name='label'
          value={updateData?.label}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className='w-[90%] mx-auto flex items-center'>
        <Label className='w-[40px] text-left'>값</Label>
        <Input
          name='value'
          value={updateData?.value}
          onChange={(e) => handleInputChange(e)}
        />
      </div>
      <div className='flex justify-center gap-2'>
        <Button onClick={handleUpdate}>저장</Button>
        <Button variant='secondary' onClick={handleCancel}>
          취소
        </Button>
      </div>
    </div>
  )
}

export default CategoryEditModal
