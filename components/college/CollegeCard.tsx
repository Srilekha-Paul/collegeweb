'use client'

import { College } from '@/../../types/college'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, MapPin, Star, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface CollegeCardProps {
  college: College
  isSaved?: boolean
  onToggleSave: (collegeId: string, saved: boolean) => void
}

export function CollegeCard({ college, isSaved, onToggleSave }: CollegeCardProps) {
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await onToggleSave(college.id, !isSaved)
    setLoading(false)
  }

  return (
    <motion.div whileHover={{ y: -4 }} className="group">
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-slate-50">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={college.image || '/colleges/default.jpg'}
            alt={college.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              disabled={loading}
              className="p-2 h-auto w-auto rounded-full"
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'fill-transparent'}`} />
            </Button>
          </div>
        </div>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <CardTitle className="text-lg leading-tight">{college.name}</CardTitle>
          </div>
          <CardDescription className="flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            {college.city}, {college.state}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span>Fees:</span>
            <span className="font-semibold">₹{college.fees.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Placement:</span>
            <span className="font-semibold">{college.placement}%</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {college.exams.slice(0, 2).map((exam) => (
              <Badge key={exam} variant="secondary">{exam}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}