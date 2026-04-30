import { CollegeDetail } from '@/components/college/CollegeDetail'
import Image from 'next/image'

interface Props {
  params: { slug: string }
}

export default async function CollegePage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL || 'http://localhost:3000'}/api/colleges/${params.slug}`, {
    cache: 'force-cache'
  })
  
  if (!res.ok) {
    return <div>College not found</div>
  }
  
  const college = await res.json()
  
  return <CollegeDetail college={college} />
}