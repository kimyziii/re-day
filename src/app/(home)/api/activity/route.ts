import connectMongo, { cached } from '@/app/(shared)/util/mongoose-connect'
import Activity from '@/models/activity'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (!cached.connection) await connectMongo()
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

export async function DELETE(req: NextRequest) {
  if (!cached.connection) await connectMongo()
  const atvtId = req.nextUrl.searchParams.get('atvtId')

  try {
    const response = await Activity.findByIdAndDelete(atvtId)
  } catch (error) {
    return NextResponse.json({ error })
  }
}
