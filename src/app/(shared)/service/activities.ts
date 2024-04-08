import axios from 'axios'

type SearchActivitiesProps = {
  userId: string
  searchStr: string
}

export const searchActivities = async ({
  userId,
  searchStr,
}: SearchActivitiesProps) => {
  const response = await axios(
    `/api/activities/search?userId=${userId}&searchStr=${searchStr}`,
  )

  if (response.data.status === 200) {
    return response.data.data
  }

  if (response.data.status === 204) {
    return null
  }
}
