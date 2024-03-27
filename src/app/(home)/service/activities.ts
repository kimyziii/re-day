import axios from 'axios'

export type GetActivityProps = {
  userId: string
  dailyDate: string
}

export const getActivities = async ({
  userId,
  dailyDate,
}: GetActivityProps) => {
  try {
    const activities = await axios.get(
      `/api/activities?userId=${userId}&dailyDate=${dailyDate}`,
    )
    return activities.data.data
  } catch (error) {
    // throw new Error(error)
  }
}
