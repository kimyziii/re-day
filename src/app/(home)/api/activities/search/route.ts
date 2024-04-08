import connectMongo, { cached } from '@/app/(shared)/util/mongoose-connect'
import Activity from '@/models/activity'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  if (!cached.connection) connectMongo()

  const userId = req.nextUrl.searchParams.get('userId')
  const searchStr = req.nextUrl.searchParams.get('searchStr') || ''
  if (searchStr.trim().length === 0) return NextResponse.json({ status: 204 })

  const regex = new RegExp(searchStr || '', 'i')
  const response = await Activity.find({
    $and: [
      {
        $or: [{ contents: { $regex: regex } }, { summary: { $regex: regex } }],
      },
      {
        createdById: userId,
      },
    ],
  })

  return NextResponse.json({ status: 200, data: response })
}
