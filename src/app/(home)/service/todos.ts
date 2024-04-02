import axios from 'axios'

export type TodoProps = {
  userId: string
  targetDate: string
}

export const getTodos = async ({ userId, targetDate }: TodoProps) => {
  try {
    const todos = await axios.get(
      `/api/todos?userId=${userId}&targetDate=${targetDate}`,
    )
    const result = todos.data
    if (result.status === 200) {
      return result.data
    } else {
      return null
    }
  } catch (error) {
    // throw new Error(error)
  }
}
