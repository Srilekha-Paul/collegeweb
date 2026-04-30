export interface College {
  id: string
  name: string
  slug: string
  location: string
  state: string
  city: string
  fees: number
  rating: number
  placement: number
  courses: string[]
  description?: string
  image?: string
  established?: number
  type: string
  exams: string[]
}