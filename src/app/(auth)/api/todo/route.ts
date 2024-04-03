import Todo from '@/models/todo'
import { Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { todoDate, content, userId, isSuccess } = await req.json()
  try {
    const createdTodo = await Todo.create({
      _id: new Types.ObjectId(),
      todoDate,
      content,
      userId: new Types.ObjectId(userId),
      isSuccess,
    })

    return NextResponse.json({ status: 201, data: createdTodo })
  } catch (error) {
    return NextResponse.json({ status: 400 })
  }
}

export async function PATCH(req: NextRequest) {
  const { _id, isSuccess } = await req.json()
  try {
    await Todo.findByIdAndUpdate(_id, { isSuccess: !isSuccess })
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  const todoId = req.nextUrl.searchParams.get('todoId')
  try {
    await Todo.findByIdAndDelete(todoId)
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json({ status: 400 })
  }
}
