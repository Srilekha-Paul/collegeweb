'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useState } from 'react'

interface FiltersProps {
  filters: {
    search: string
    location: string
    minFees: string
    maxFees: string
    page: number
  }
  onFiltersChange: (filters: any) => void
}

const locations = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Rajasthan']

export function Filters({ filters, onFiltersChange }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  const applyFilters = () => {
    onFiltersChange(localFilters)
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg sticky top-24 h-fit">
      <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <Select 
            value={localFilters.location} 
            onValueChange={(value) => setLocalFilters({ ...localFilters, location: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All States</SelectItem>
              {locations.map(loc => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Fees Range (₹)</label>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.minFees}
                onChange={(e) => setLocalFilters({ ...localFilters, minFees: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.maxFees}
                onChange={(e) => setLocalFilters({ ...localFilters, maxFees: e.target.value })}
              />
            </div>
          </div>
        </div>

        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}