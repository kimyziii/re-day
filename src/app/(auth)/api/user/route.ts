import User from '@/app/models/user'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const deserializedReq = await req.json()
    const { name, email, image, nickname } = deserializedReq
    const user = await User.create({
      name,
      email,
      image,
      nickname,
    })

    return NextResponse.json({
      message: 'success',
      status: 201,
      userData: user,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}
