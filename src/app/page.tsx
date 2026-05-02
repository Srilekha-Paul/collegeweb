'use client'

import { useState, useEffect } from 'react'
// import { CollegeCard } from '@/components/colleges/CollegeCard'
import { CollegeCard } from '../../components/college/CollegeCard'
// import { Filters } from '@/components/colleges/Filters'
import { Filters } from '../../components/college/Filters'
// import { useSaved } from '@/hooks/useSaved'
import { useSaved } from '../../hooks/useSaved'
// import { College } from '@/types/college'/
import { College } from '../../types/college'


export default function CollegesPage() {
  const [colleges, setColleges] = useState<College[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    minFees: '',
    maxFees: '',
    page: 1
  })
  const { savedColleges, toggleSave } = useSaved()

  useEffect(() => {
    fetchColleges()
  }, [filters])

  const fetchColleges = async () => {
    setLoading(true)
    const params = new URLSearchParams({
      page: filters.page.toString(),
      ...(filters.search && { search: filters.search }),
      ...(filters.location && { location: filters.location }),
      ...(filters.minFees && { minFees: filters.minFees }),
      ...(filters.maxFees && { maxFees: filters.maxFees }),
    })

    const res = await fetch(`/api/colleges?${params}`)
    const data = await res.json()
    setColleges(data.colleges)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">Loading colleges...</div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Discover Colleges
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Find your perfect college with advanced filters and detailed comparisons
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <Filters filters={filters} onFiltersChange={setFilters} />
        
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                isSaved={savedColleges.includes(college.id)}
                onToggleSave={toggleSave}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}