import { NextResponse } from 'next/server'
import { connectToDatabase } from '../../../utils/dbConnect'

export async function GET(req: Request): Promise<NextResponse> {
  const db = await connectToDatabase()
  const posts = await db.collection('posts').find().toArray()
  return NextResponse.json(posts, { status: 200 })
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { title, description }: { title: string; description: string } = await req.json()

    // if ((!title && !description) || title == null || description == null) {
    //   throw new Error('محتوا نباید خالی باشه')
    // }

    const db = await connectToDatabase()
    await db.collection('posts').insertOne({ title, description, createdAt: new Date() })

    return NextResponse.json('ok', { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 })
  }
}
