import { NextRequest, NextResponse } from 'next/server'
// import { prisma } from '@/lib/prisma'
import { prisma } from '../../lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { userId, collegeId } = await request.json()
    
    const existing = await prisma.savedCollege.findUnique({
      where: { userId_collegeId: { userId, collegeId } }
    })

    if (existing) {
      await prisma.savedCollege.delete({
        where: { id: existing.id }
      })
      return NextResponse.json({ saved: false })
    }

    await prisma.savedCollege.create({
      data: { userId, collegeId }
    })

    return NextResponse.json({ saved: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save college' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json([])
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId },
      include: { college: true }
    })

    return NextResponse.json(savedColleges.map(sc => sc.college))
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch saved colleges' }, { status: 500 })
  }
}