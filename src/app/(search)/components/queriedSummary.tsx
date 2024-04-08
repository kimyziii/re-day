import React from 'react'

const QueriedSummary = ({
  summary,
  query,
}: {
  summary: string
  query: string
}) => {
  const queriedArray = summary.split(query)

  return (
    <div>
      <span>{queriedArray[0]}</span>
      <span className='text-primary font-semibold'>{query}</span>
      <span>{queriedArray[1]}</span>
    </div>
  )
}

export default QueriedSummary
