import axios from 'axios'

export const getCategoryItem = async (userId: string) => {
  try {
    const getCategoryItems = await axios.get(
      `/api/categoryItem?userId=${userId}`,
    )
    if (getCategoryItems) {
      return getCategoryItems.data.data
    } else {
      return null
    }
  } catch (error) {
    return error
  }
}
