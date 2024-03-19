import { model, models, Schema } from 'mongoose'

export interface User {
  id?: string
  name: string
  nickname: string
  email: string
  image?: string
  type?: string
}

const UserSchema = new Schema<User>(
  {
    id: String,
    name: String,
    nickname: String,
    email: String,
    image: String,
  },
  {
    timestamps: true,
  },
)

const User = models.User || model('User', UserSchema)
export default User
