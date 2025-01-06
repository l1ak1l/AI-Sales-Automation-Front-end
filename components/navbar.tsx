import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="bg-[#f8f8f8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-gray-900">AI Sales Automation</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Home
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Dashboard
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Demo
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
