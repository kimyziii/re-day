import { ITodo } from '@/app/models/todo'
import axios from 'axios'

export const createTodo = async (data: ITodo) => {
  try {
    const response = await axios.post(`/api/todo`, data)
    const result = response.data

    if (result.status === 201) {
      return { status: 200, data: result.data }
    }
  } catch (error) {
    // throw new Error(error)
  }
}

export const changeTodoStatus = async ({
  todoStatus,
  todoId,
}: {
  todoStatus: boolean
  todoId: string
}) => {
  const obj = {
    _id: todoId,
    isSuccess: todoStatus,
  }

  try {
    const response = await axios.patch(`/api/todo`, obj)
    const result = response.data

    if (result.status === 200) {
      return { status: 200 }
    }
  } catch (error) {
    // throw new Error(error)
  }
}

export const deleteTodo = async (todoId: string) => {
  try {
    const response = await axios.delete(`/api/todo?todoId=${todoId}`)
    const result = response.data

    if (result.status === 200) {
      return { status: 200 }
    }
  } catch (error) {
    // throw new Error(error)
  }
}
