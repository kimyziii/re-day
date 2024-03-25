import mongoose from 'mongoose'

export interface ICategoryItem {
  _id?: string
  label: string
  value: string
  userId?: string
}

const CategoryItemSchema = new mongoose.Schema<ICategoryItem>({
  _id: String,
  label: String,
  value: String,
  userId: String,
})

const CategoryItem =
  mongoose.models?.CategoryItem ||
  mongoose.model('CategoryItem', CategoryItemSchema)

export default CategoryItem
