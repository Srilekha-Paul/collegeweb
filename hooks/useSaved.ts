'use client'

import { useState, useEffect } from 'react'
import { College } from '@/types/college'

export function useSaved() {
  const [savedColleges, setSavedColleges] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch saved colleges on mount
    fetchSavedColleges()
  }, [])

  const fetchSavedColleges = async () => {
    try {
      const res = await fetch('/api/saved')
      const colleges = await res.json()
      setSavedColleges(colleges.map((c: College) => c.id))
    } catch {
      setSavedColleges([])
    }
  }

  const toggleSave = async (collegeId: string, currentlySaved: boolean) => {
    setLoading(true)
    try {
      await fetch('/api/saved', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user', // Replace with real user ID
          collegeId
        })
      })
      
      setSavedColleges(prev => 
        currentlySaved 
          ? prev.filter(id => id !== collegeId)
          : [...prev, collegeId]
      )
    } catch (error) {
      console.error('Failed to toggle save')
    } finally {
      setLoading(false)
    }
  }

  return {
    savedColleges,
    isSaved: (collegeId: string) => savedColleges.includes(collegeId),
    toggleSave,
    loading
  }
}