'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Search, Heart, GraduationCap, Menu } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export function Navbar() {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (search.trim()) {
      router.push(`/colleges?search=${encodeURIComponent(search)}`)
    }
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Colleges', href: '/colleges' },
    { name: 'Saved', href: '/saved' },
  ]

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
        >
          <GraduationCap className="h-6 w-6 text-blue-600" />
          CollegeHub
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 ml-8">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition ${
                pathname === item.href
                  ? 'text-blue-600'
                  : 'text-slate-700 hover:text-blue-600'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-8"
        >
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

            <Input
              type="search"
              placeholder="Search colleges..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 rounded-xl"
            />
          </div>
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          <Link href="/saved">
            <Button variant="ghost" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </Link>

          <Link href="/login" className="hidden sm:block">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}