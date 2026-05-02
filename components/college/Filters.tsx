'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'

interface FilterType {
  search: string
  location: string
  minFees: string
  maxFees: string
  page: number
}

interface FiltersProps {
  filters: FilterType
  onFiltersChange: (filters: FilterType) => void
}

const locations = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Rajasthan']

export function Filters({
  filters,
  onFiltersChange,
}: FiltersProps) {
  const [localFilters, setLocalFilters] =
    useState<FilterType>(filters)

  const applyFilters = () => {
    onFiltersChange(localFilters)
  }

  const resetFilters = () => {
    const resetData: FilterType = {
      search: '',
      location: '',
      minFees: '',
      maxFees: '',
      page: 1,
    }

    setLocalFilters(resetData)
    onFiltersChange(resetData)
  }

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg sticky top-24 h-fit">
      <h3 className="text-lg font-semibold">
        Filters
      </h3>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Search
          </label>

          <Input
            placeholder="College name..."
            value={localFilters.search}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                search: e.target.value,
              })
            }
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Location
          </label>

          <Select
            value={localFilters.location}
            onValueChange={(value) =>
              setLocalFilters({
                ...localFilters,
                location: value ?? '',
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All States" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All States
              </SelectItem>

              {locations.map((loc) => (
                <SelectItem
                  key={loc}
                  value={loc}
                >
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Fees */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Fees Range (₹)
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters.minFees}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  minFees: e.target.value,
                })
              }
            />

            <Input
              type="number"
              placeholder="Max"
              value={localFilters.maxFees}
              onChange={(e) =>
                setLocalFilters({
                  ...localFilters,
                  maxFees: e.target.value,
                })
              }
            />
          </div>
        </div>

        {/* Slider */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Quick Max Fees
          </label>

          <Slider
            defaultValue={[50000]}
            max={500000}
            step={10000}
            onValueChange={(value) =>
              setLocalFilters({
                ...localFilters,
                maxFees: String(
                  Array.isArray(value)
                    ? value[0]
                    : value
                ),
              })
            }
          />
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <Button
            onClick={applyFilters}
            className="w-full"
          >
            Apply Filters
          </Button>

          <Button
            variant="outline"
            onClick={resetFilters}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}

// 'use client'

// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Slider } from '@/components/ui/slider'
// import { useState } from 'react'

// interface FiltersProps {
//   filters: {
//     search: string
//     location: string
//     minFees: string
//     maxFees: string
//     page: number
//   }
//   onFiltersChange: (filters: any) => void
// }

// const locations = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Rajasthan']

// export function Filters({ filters, onFiltersChange }: FiltersProps) {
//   const [localFilters, setLocalFilters] = useState(filters)

//   const applyFilters = () => {
//     onFiltersChange(localFilters)
//   }

//   return (
//     <div className="space-y-6 bg-white p-6 rounded-2xl shadow-lg sticky top-24 h-fit">
//       <h3 className="font-semibold text-lg mb-4">Filters</h3>
      
//       <div className="space-y-4">
//         <div>
//           <label className="text-sm font-medium mb-2 block">Location</label>
//           <Select 
//             value={localFilters.location} 
//             onValueChange={(value) => setLocalFilters({ ...localFilters, location: value })}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="All States" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="">All States</SelectItem>
//               {locations.map(loc => (
//                 <SelectItem key={loc} value={loc}>{loc}</SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm font-medium mb-2 block">Fees Range (₹)</label>
//           <div className="space-y-2">
//             <div className="grid grid-cols-2 gap-2 text-xs">
//               <Input
//                 type="number"
//                 placeholder="Min"
//                 value={localFilters.minFees}
//                 onChange={(e) => setLocalFilters({ ...localFilters, minFees: e.target.value })}
//               />
//               <Input
//                 type="number"
//                 placeholder="Max"
//                 value={localFilters.maxFees}
//                 onChange={(e) => setLocalFilters({ ...localFilters, maxFees: e.target.value })}
//               />
//             </div>
//           </div>
//         </div>

//         <Button onClick={applyFilters} className="w-full">
//           Apply Filters
//         </Button>
//       </div>
//     </div>
//   )
// }