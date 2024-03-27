import connectMongo from '@/app/(shared)/util/mongoose-connect'
import User from '@/app/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  await connectMongo()

  try {
    const { email } = await req.json()

    const existedUser = await User.findOne({ email: email }).exec()
    if (!existedUser) {
      return NextResponse.json({ result: 'new user' })
    } else {
      await User.findOneAndUpdate(
        { _id: existedUser._id },
        { ...existedUser, updatedAt: new Date(0) },
      )
      return NextResponse.json({
        result: 'existing user',
        userData: existedUser,
      })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}
