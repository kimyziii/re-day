import connectMongo from '@/app/(shared)/util/mongoose-connect'
import Activity from '@/app/models/activity'
import mongoose from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  mongoose.set('debug', true)
  await connectMongo()
  try {
    const { categoryId, summary, contents, dailyDate, createdById } =
      await req.json()

    const response = await Activity.create({
      categoryId,
      summary,
      contents,
      dailyDate,
      createdById,
    })

    return NextResponse.json({ result: 'success', data: response })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}
