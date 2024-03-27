import connectMongo from '@/app/(shared)/util/mongoose-connect'
import CategoryItem from '@/app/models/categoryItem'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get('userId')

  try {
    await connectMongo()

    const response = await CategoryItem.find({
      $or: [{ userId }, { type: 'public' }],
    })
    return NextResponse.json({ status: 'success', data: response })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}
