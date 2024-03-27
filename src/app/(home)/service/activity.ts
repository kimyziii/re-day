import { IActivity } from '@/app/models/activity'
import axios from 'axios'

export const addAtvt = async (data: IActivity) => {
  try {
    const newAtvt = await axios.post('/api/activity', data)
    return newAtvt
  } catch (error) {
    // throw new Error(error?.message)
  }
}
