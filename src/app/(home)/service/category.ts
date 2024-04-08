import { ICategoryItem } from '@/models/categoryItem'
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

export const createCategoryItem = async (data: Omit<ICategoryItem, '_id'>) => {
  try {
    const newCategory = await axios.post(`/api/categoryItem`, data)
    if (newCategory) {
      return { data: newCategory }
    } else {
      return null
    }
  } catch (error: any) {
    throw error
  }
}

export const updateCategoryItem = async (data: {
  label: string
  value: string
  itemId: string
}) => {
  try {
    const response = await axios.patch(`/api/categoryItem`, data)
    if (response.data.status === 200) return { status: 204 }
  } catch (error: any) {
    throw error
  }
}
