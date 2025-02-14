import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react"; // Icons for the hamburger menu

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-[#f8f8f8] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-900">AI Sales Automation</span>
          </Link>

          {/* Desktop Links (Hidden on small screens) */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">Home</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">Dashboard</Button>
            </Link>
            <Link href="/demo">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">Demo</Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900">Sign in</Button>
            </Link>
          </div>

          {/* Mobile Menu Button (Hidden on larger screens) */}
          <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu (Only visible when toggled) */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-2 p-4 bg-[#f8f8f8] shadow-md rounded-md">
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full text-gray-700 hover:text-gray-900">Home</Button>
            </Link>
            <Link href="/dashboard" className="block">
              <Button variant="ghost" className="w-full text-gray-700 hover:text-gray-900">Dashboard</Button>
            </Link>
            <Link href="/demo" className="block">
              <Button variant="ghost" className="w-full text-gray-700 hover:text-gray-900">Demo</Button>
            </Link>
            <Link href="/login" className="block">
              <Button variant="ghost" className="w-full text-gray-700 hover:text-gray-900">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
