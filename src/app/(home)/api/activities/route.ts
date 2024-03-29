import connectMongo from '@/app/(shared)/util/mongoose-connect'
import Activity from '@/app/models/activity'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const userId = request.nextUrl.searchParams.get('userId')
  const dailyDate = request.nextUrl.searchParams.get('dailyDate')

  try {
    await connectMongo()

    const response = await Activity.find({
      createdById: userId,
      dailyDate,
    })
      .populate('categoryId')
      .populate('createdById')
      .exec()

    return NextResponse.json({ status: 'success', data: response })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}
