export function formatDate(date: Date, type: string) {
  if (type === 'yyyyMMdd') {
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')

    return year + month + day
  }
}

export function formatDailyDateToDate(dailyDate: string) {
  const year = dailyDate.slice(0, 4)
  const month = dailyDate.slice(4, 6)
  const day = dailyDate.slice(6, 8)

  return `${year}. ${month}. ${day}`
}

export function formatStringToDate(strDate: string) {
  const date = new Date(strDate)

  const y = date.getFullYear()
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')

  return `${y}. ${m}. ${d}`
}
