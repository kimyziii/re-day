import connectMongo, { cached } from '@/app/(shared)/util/mongoose-connect'
import CategoryItem from '@/models/categoryItem'
import { MongooseError, Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get('userId')

  try {
    if (!cached.connection) await connectMongo()

    const response = await CategoryItem.find({
      $or: [{ userId }, { type: 'public' }],
    })
    return NextResponse.json({ status: 'success', data: response })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}

export const POST = async (request: NextRequest) => {
  if (!cached.connection) await connectMongo()

  try {
    const type = 'private'
    const { label, value, userId } = await request.json()

    const response = await CategoryItem.create({
      _id: new Types.ObjectId(),
      label,
      value,
      userId,
      type,
    })

    return NextResponse.json({ result: 'success', data: response })
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log(`error in mongoose error`)
      console.log(error.name, error.message)
      // return new NextResponse.error()
    }
  }
}

export const PATCH = async (request: NextRequest) => {
  if (!cached.connection) await connectMongo()
  const { itemId, label, value } = await request.json()

  const response = await CategoryItem.findByIdAndUpdate(itemId, {
    label,
    value,
  })

  try {
    return NextResponse.json({ status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}
