import connectMongo from '@/app/(shared)/util/mongoose-connect'
import Todo from '@/app/models/todo'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  await connectMongo()

  const userId = req.nextUrl.searchParams.get('userId')
  const todoDate = req.nextUrl.searchParams.get('targetDate')

  try {
    const todos = await Todo.find({ userId, todoDate })
    if (todos.length > 0) {
      return NextResponse.json({ status: 200, data: todos })
    } else {
      return NextResponse.json({ status: 204 })
    }
  } catch (error) {
    return NextResponse.json({ status: 400 })
  }
}
