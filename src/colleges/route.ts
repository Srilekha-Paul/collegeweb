import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const location = searchParams.get('location') || ''
    const minFees = searchParams.get('minFees')
    const maxFees = searchParams.get('maxFees')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 10

    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } }
      ]
    }

    if (location) {
      where.state = { contains: location, mode: 'insensitive' }
    }

    if (minFees || maxFees) {
      where.fees = {}
      if (minFees) where.fees.gte = parseFloat(minFees)
      if (maxFees) where.fees.lte = parseFloat(maxFees)
    }

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { rating: 'desc' }
      }),
      prisma.college.count({ where })
    ])

    return NextResponse.json({
      colleges,
      pagination: {
        page,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 })
  }
}