import { model, models, Schema, Types } from 'mongoose'
import User from './user'

export interface ITodo {
  _id?: Types.ObjectId
  todoDate?: string
  content: string
  userId: Types.ObjectId
  isSuccess: boolean
}

const TodoSchema = new Schema<ITodo>(
  {
    _id: Schema.Types.ObjectId,
    todoDate: String,
    content: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
    },
    isSuccess: Boolean,
  },
  {
    timestamps: true,
  },
)

const Todo = models?.todo || model('todo', TodoSchema)

export default Todo
