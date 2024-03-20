import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@radix-ui/react-select'
import React, { useState } from 'react'
import { CATEGORIES } from '../util/acvtCategory'
import { Button } from './button'
import { Card } from './card'
import { Input } from './input'
import { Textarea } from './textarea'

function AtvtSection() {
  const [summary, setSummary] = useState('')
  const [contents, setContents] = useState('')
  const [category, setCategory] = useState(['카테고리', '카테고리'])

  const handleSaveAtvt = () => {
    setCategory(() => ['카테고리', '카테고리'])
    setSummary('')
    setContents('')
  }

  return (
    <Card className='px-2 py-2 space-y-1 '>
      <div className='flex items-center gap-2'>
        <Input
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className='border-none shadow-none'
          placeholder='활동내용을 간단히 정리해 작성해 주세요.'
        />
        <div>
          <Select
            value={category[1]}
            onValueChange={(value) => {
              setCategory(() => [value, CATEGORIES[value]])
            }}
          >
            <SelectTrigger className='w-[100px] py-1 rounded-lg text-sm bg-accent text-black focus:outline-none'>
              <SelectValue aria-label={category[0]}>{category[1]}</SelectValue>
            </SelectTrigger>
            <SelectContent className='flex items-center w-[100px] rounded-lg overflow-hidden'>
              {Object.entries(CATEGORIES).map((category) => {
                return (
                  <SelectItem
                    key={category[0]}
                    className='w-[100px] text-center bg-slate-100 hover:bg-primary hover:text-white py-1 focus:outline-none'
                    value={category[0]}
                    data-value={category[0]}
                  >
                    {category[1]}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder='내용을 입력해 주세요.'
        className='border-none shadow-none resize-none min-h-[20vh] max-h-[40px]'
      />
      <hr />
      <div className='text-right'>
        <Button onClick={handleSaveAtvt} size='sm'>
          저장
        </Button>
      </div>
    </Card>
  )
}

export default AtvtSection
