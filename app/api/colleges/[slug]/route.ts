import { NextRequest } from 'next/server'
// import { prisma } from '@/lib/prisma'
import { prisma } from '@/../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const college = await prisma.college.findUnique({
      where: { slug: params.slug }
    })

    if (!college) {
      return Response.json({ error: 'College not found' }, { status: 404 })
    }

    return Response.json(college)
  } catch (error) {
    return Response.json({ error: 'Failed to fetch college' }, { status: 500 })
  }
}