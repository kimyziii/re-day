import { model, models, Schema, Types } from 'mongoose'

export interface IUser {
  _id?: Types.ObjectId
  name: string
  nickname: string
  email: string
  image: string
  type?: string
}

const UserSchema = new Schema<IUser>(
  {
    _id: Schema.Types.ObjectId,
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

const User = models?.user || model('user', UserSchema)

export default User
