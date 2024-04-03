import { IActivity } from '@/models/activity'
import axios from 'axios'

export const addAtvt = async (data: IActivity) => {
  try {
    const newAtvt = await axios.post('/api/activity', data)
    return newAtvt
  } catch (error) {
    // throw new Error(error?.message)
  }
}

export const deleteAtvt = async (atvtId: string) => {
  try {
    const deleteAtvt = await axios.delete(`/api/activity?atvtId=${atvtId}`)
    return deleteAtvt
  } catch (error) {
    // throw new Error(error?.message)
  }
}
