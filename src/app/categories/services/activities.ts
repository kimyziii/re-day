import axios from 'axios'

type CountByCategoriesProps = {
  userId: string
}

export const getCountByCategories = async ({
  userId,
}: CountByCategoriesProps) => {
  try {
    const response = await axios.get(
      `/categories/api/categoryCount?userId=${userId}`,
    )
    const { status, result: data } = response.data
    if (status === 200) {
      return data
    } else if (status === 204) {
      return null
    } else if (status === 400) {
      throw new Error(response.data.error)
    }
  } catch (error) {
    return error
  }
}
