import axios from 'axios'

type ActivitiesByCategoryProps = {
  categoryId: string
  userId: string
}

export const getActivitiesByCategory = async ({
  categoryId,
  userId,
}: ActivitiesByCategoryProps) => {
  const response = await axios.get(
    `/categories/api/activities?categoryId=${categoryId}&userId=${userId}`,
  )
  const status = response.data.status

  if (status === 200) {
    return response.data.data
  }

  if (status === 204) {
    return null
  }

  if (status === 400) {
    throw new Error(response.data.error)
  }
}
