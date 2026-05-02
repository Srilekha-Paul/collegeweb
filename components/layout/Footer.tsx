// components/layout/Footer.tsx

import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-white mt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            CollegeHub
          </div>

          <p className="text-sm text-slate-600 leading-6">
            Discover, compare and choose the best college for your future.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-semibold text-slate-900">
            Quick Links
          </h4>

          <div className="space-y-2 text-sm text-slate-600">
            <Link href="/" className="block hover:text-blue-600">
              Home
            </Link>

            <Link href="/colleges" className="block hover:text-blue-600">
              Colleges
            </Link>

            <Link href="/saved" className="block hover:text-blue-600">
              Saved
            </Link>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="mb-4 font-semibold text-slate-900">
            Categories
          </h4>

          <div className="space-y-2 text-sm text-slate-600">
            <p>Engineering</p>
            <p>Medical</p>
            <p>MBA</p>
            <p>Law</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-semibold text-slate-900">
            Contact
          </h4>

          <div className="space-y-2 text-sm text-slate-600">
            <p>Email: support@collegehub.com</p>
            <p>India</p>
          </div>
        </div>
      </div>

      <div className="border-t px-6 py-4 text-center text-sm text-slate-500">
         Created By Srilekha Paul | © 2026 CollegeHub. All rights reserved.
      </div>
    </footer>
  )
}