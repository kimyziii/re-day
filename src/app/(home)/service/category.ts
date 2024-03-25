import axios from 'axios'

export const getCategoryItem = async (userId: string) => {
  try {
    const getCategoryItems = await axios.get(
      `/api/categoryItem?userId=${userId}`,
    )
    return getCategoryItems
  } catch (error) {
    console.log(error)
  }
}
