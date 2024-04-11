import connectMongo, { cached } from '@/app/(shared)/util/mongoose-connect'
import Activity from '@/models/activity'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const categoryId = request.nextUrl.searchParams.get('categoryId')
  const userId = request.nextUrl.searchParams.get('userId')

  try {
    if (!cached.connection) await connectMongo()

    const response = await Activity.find({
      $and: [{ categoryId }, { createdById: userId }],
    }).populate({ path: 'categoryId', model: 'categoryitem' })

    if (response.length > 0)
      return NextResponse.json({ status: 200, data: response })
    return NextResponse.json({ status: 204 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 400, error })
  }
}
