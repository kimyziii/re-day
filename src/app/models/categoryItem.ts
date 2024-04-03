import mongoose, { model, models, Schema, Types } from 'mongoose'

export interface ICategoryItem {
  _id: Types.ObjectId
  label: string
  value: string
  userId?: Types.ObjectId
  type?: string
}

const CategoryItemSchema = new mongoose.Schema<ICategoryItem>({
  _id: Schema.Types.ObjectId,
  label: String,
  value: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  type: String,
})

const CategoryItem =
  models?.CategoryItem || model('categoryitem', CategoryItemSchema)

export default CategoryItem
