'use client'

// import { College } from '@/types/college'
import { College } from '@/../../types/college'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  DollarSign, 
  Star, 
  TrendingUp, 
  Calendar,
  Users 
} from 'lucide-react'
// import { useSaved } from '@/hooks/useSaved'
import { useSaved } from '@/../../hooks/useSaved'

interface CollegeDetailProps {
  college: College
}

export function CollegeDetail({ college }: CollegeDetailProps) {
  const { toggleSave, isSaved } = useSaved(college.id)

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid lg:grid-cols-3 gap-8"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{college.name}</h1>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-6 w-6 fill-yellow-300 text-yellow-300" />
                  <span className="text-2xl font-semibold">{college.rating}</span>
                </div>
                <div className="flex items-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>{college.placement}% Placement</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    <span>₹{college.fees.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <Button 
                onClick={() => toggleSave(college.id, !isSaved)}
                className="w-full md:w-auto justify-self-end bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30 text-white"
                size="lg"
              >
                {isSaved ? '❤️ Saved' : 'Save College'}
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white shadow-xl border">
              <MapPin className="h-12 w-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-center">Location</h3>
              <p className="text-2xl font-bold text-center">{college.location}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-xl border">
              <Calendar className="h-12 w-12 text-green-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-center">Established</h3>
              <p className="text-2xl font-bold text-center">{college.established}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white shadow-xl border">
              <Users className="h-12 w-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2 text-center">Type</h3>
              <Badge className="text-lg px-4 py-2 mx-auto block w-fit" variant={college.type === 'Public' ? 'default' : 'secondary'}>
                {college.type}
              </Badge>
            </div>
          </div>

          {/* Description */}
          {college.description && (
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-6">About {college.name}</h2>
              <p className="text-lg leading-relaxed text-gray-700">{college.description}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-xl sticky top-32">
            <h3 className="font-semibold text-lg mb-4">Entrance Exams</h3>
            <div className="space-y-2">
              {college.exams.map((exam) => (
                <Badge key={exam} variant="outline" className="w-full justify-center">
                  {exam}
                </Badge>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-xl mb-3">Popular Courses</h3>
            <div className="space-y-2">
              {college.courses.slice(0, 4).map((course, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="w-2 h-2 bg-white rounded-full" />
                  <span>{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}