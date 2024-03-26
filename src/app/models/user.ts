import { InferSchemaType, model, models, Schema } from 'mongoose'

export interface IUser {
  _id?: string
  name: string
  nickname: string
  email: string
  image: string
  type?: string
}

const UserSchema = new Schema<IUser>(
  {
    _id: String,
    name: String,
    nickname: String,
    email: {
      type: String,
      require: true,
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
