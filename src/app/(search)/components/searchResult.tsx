import { IActivity } from '@/models/activity'
import React from 'react'
import { ActivityData } from './command'
import QueriedContents from './queriedContents'
import QueriedSummary from './queriedSummary'

const SearchResult = ({
  data,
  queryStr,
}: {
  data: ActivityData
  queryStr: string
}) => {
  const summaryIncludesQuery = data.summary.includes(queryStr)
  const contentsIncludesQuery = data.contents.includes(queryStr)

  return (
    <div
      key={data._id}
      className='text-left px-3 py-3 pb-3 text-sm border-b last:border-none hover:bg-primary-opacity'
    >
      {/* 제목 영역 */}
      {summaryIncludesQuery && (
        <QueriedSummary summary={data.summary} query={queryStr} />
      )}
      {!summaryIncludesQuery && <div>{data.summary}</div>}

      {/* 내용 영역 */}
      {contentsIncludesQuery && (
        <QueriedContents contents={data.contents} query={queryStr} />
      )}
      {!contentsIncludesQuery && (
        <div className='w-full text-xs whitespace-normal line-clamp-3 overflow-hidden'>
          {data.contents}
        </div>
      )}
    </div>
  )
}

export default SearchResult
