import connectMongo, { cached } from '@/app/(shared)/util/mongoose-connect'
import Activity from '@/models/activity'
import { Schema, Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

type CountCategory = {
  label: string
  value: string
  count: number
  _id: Schema.Types.ObjectId
}

type CountArray = CountCategory[]

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId') || ''

  try {
    if (!cached.connection) await connectMongo()

    const result: CountArray = await Activity.aggregate([
      {
        $match: {
          createdById: new Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'categoryitems',
          localField: 'categoryId',
          foreignField: '_id',
          as: 'categoryItem',
        },
      },
      {
        $addFields: {
          category: { $first: '$categoryItem' },
        },
      },
      {
        $group: {
          _id: '$categoryId',
          count: { $sum: 1 },
          label: { $max: '$category.label' },
          value: { $max: '$category.value' },
          lastDate: { $max: '$createdAt' },
        },
      },
      {
        $sort: {
          count: -1,
          lastDate: -1,
          label: 1,
        },
      },
    ])

    if (result.length > 0) {
      return NextResponse.json({ status: 200, result })
    }
    return NextResponse.json({ status: 204, data: null })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 400, error })
  }
}
