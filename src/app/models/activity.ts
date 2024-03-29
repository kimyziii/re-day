import { model, models, Schema, Types } from 'mongoose'

export interface IActivity {
  _id?: string
  dailyDate: string
  categoryId: Types.ObjectId
  summary: string
  contents: string
  createdById: Types.ObjectId
}

const ActivitySchema = new Schema<IActivity>(
  {
    dailyDate: String,
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'CategoryItem',
    },
    summary: String,
    contents: String,
    createdById: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const Activity = models.Activity || model<IActivity>('Activity', ActivitySchema)
export default Activity
