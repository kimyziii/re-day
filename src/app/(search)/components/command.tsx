import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { IActivity } from '@/models/activity'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../(shared)/context/userContext'
import { searchActivities } from '../../(shared)/service/activities'
import SearchResult from './searchResult'

const CommandComponent = () => {
  const DEBOUNCE_TIME = 300

  const { user } = useContext(UserContext)
  const userId = user.id

  const [searchStr, setSearchStr] = useState('')
  const [debouncedSearchStr, setDebouncedSearchStr] = useState('')

  const handleChange = (value: string) => {
    setSearchStr(value)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearchStr(() => searchStr)
    }, DEBOUNCE_TIME)

    return () => clearTimeout(debounce)
  }, [searchStr])

  // 검색어가 입력이 되었을 때는 api 보내서 검색하고, 입력 안 되어 있을 때는 api 보내지 말고 검색어 입력하라고 보내기
  // 매번 보내는 걸로 하지 말고 30ms 딜레이 생겼을 때만 검색하도록
  const { data } = useQuery({
    queryKey: ['activities', userId, debouncedSearchStr],
    queryFn: () => searchActivities({ userId, searchStr: debouncedSearchStr }),
  })

  return (
    <Command className='fixed w-[60vw] h-[50svh] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50'>
      <CommandInput
        onValueChange={(e) => handleChange(e)}
        placeholder='Type a command or search...'
      />
      <CommandList>
        {data?.length === 0 && (
          <div className='py-6 text-center text-sm'>
            검색어에 맞는 결과가 없습니다.
          </div>
        )}
        <div className='overflow-y-auto'>
          {data &&
            data.map((d: IActivity) => {
              return (
                <SearchResult
                  key={d._id}
                  data={d}
                  queryStr={debouncedSearchStr}
                />
              )
            })}
        </div>
      </CommandList>
    </Command>
  )
}

export default CommandComponent