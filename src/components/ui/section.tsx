import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import React from 'react'
import { Card } from './card'
import { Input } from './input'
import { Textarea } from './textarea'

const CATEGORIES = [
  ['💻', '공부'],
  ['💪', '체력'],
  ['📺', '시청'],
  ['📖', '독서'],
  ['🛝', '여가'],
]

function AtvtSection() {
  return (
    <Card className='px-2 py-2 space-y-1 '>
      <div className='flex items-center gap-2'>
        <Input
          className='border-none shadow-none'
          placeholder='활동 이름을 입력해 주세요.'
        />
        <div>
          <Select>
            <SelectTrigger className='w-[100px] py-1 rounded-lg text-sm bg-primary text-white focus:outline-none'>
              <SelectValue placeholder='카테고리' />
            </SelectTrigger>
            <SelectContent className='flex items-center w-[100px] rounded-lg overflow-hidden'>
              {CATEGORIES.map((category) => {
                return (
                  <SelectItem
                    className='w-[100px] text-center bg-slate-100 hover:bg-primary hover:text-white py-1 focus:outline-none'
                    value={category[1]}
                  >
                    {category[0]}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Textarea
        placeholder='내용을 입력해 주세요.'
        className='border-none shadow-none resize-none min-h-[20vh] max-h-[40px]'
      />
    </Card>
  )
}

export default AtvtSection
