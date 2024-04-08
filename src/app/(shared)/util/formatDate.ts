export function formatDate(date: Date, type: string) {
  if (type === 'yyyyMMdd') {
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return year + month + day
  }
}

export function formatStringToDate(dailyDate: string) {
  const year = dailyDate.slice(0, 4)
  const month = dailyDate.slice(4, 6)
  const day = dailyDate.slice(6, 8)

  return `${year}. ${month}. ${day}`
}
