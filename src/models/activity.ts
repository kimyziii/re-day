import { model, models, Schema, Types } from 'mongoose'
import User from './user'
import CategoryItem from './categoryItem'

export interface IActivity {
  _id?: string
  dailyDate: string
  categoryId: Types.ObjectId
  summary: string
  contents: string
  createdById: Types.ObjectId
  createdAt?: string
  updatedAt?: string
}

const ActivitySchema = new Schema<IActivity>(
  {
    dailyDate: String,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: CategoryItem.modelName,
    },
    summary: String,
    contents: String,
    createdById: {
      type: Schema.Types.ObjectId,
      ref: User.modelName,
    },
  },
  {
    timestamps: true,
  },
)

const Activity = models.activity || model<IActivity>('activity', ActivitySchema)
export default Activity
