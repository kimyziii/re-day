import { model, models, Schema, Types } from 'mongoose'

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
      ref: 'user',
    },
    isSuccess: Boolean,
  },
  {
    timestamps: true,
  },
)

const Todo = models?.Todo || model('todo', TodoSchema)

export default Todo
