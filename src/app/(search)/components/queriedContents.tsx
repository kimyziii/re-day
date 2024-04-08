import React from 'react'

const QueriedContents = ({
  contents,
  query,
}: {
  contents: string
  query: string
}) => {
  const queries = contents.split(query)

  return (
    <div className='w-full text-xs whitespace-normal line-clamp-3 overflow-hidden'>
      <span>
        {queries[0].length > 100 ? queries[0].slice(-130) : queries[0]}
      </span>
      <span className='text-primary font-semibold bg-muted'>{query}</span>
      <span>{queries[1]}</span>
    </div>
  )
}

export default QueriedContents
