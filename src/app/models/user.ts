import { model, models, Schema } from 'mongoose'

export interface User {
  _id?: string
  name: string
  nickname: string
  email: string
  image?: string
  type?: string
}

const UserSchema = new Schema<User>(
  {
    _id: String,
    name: String,
    nickname: String,
    email: {
      type: String,
      unique: true,
    },
    image: String,
  },
  {
    timestamps: true,
  },
)

const User = models.User || model('User', UserSchema)
export default User
