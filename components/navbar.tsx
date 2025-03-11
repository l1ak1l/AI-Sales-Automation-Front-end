"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

const navItems = [
  { name: "Home", link: "/" },
  { name: "Dashboard", link: "/dashboard" },
  { name: "CRM Integration", link: "/crm-integration" },
  { name: "Sales Agent", link: "/sales-agent" },
  { name: "Demo", link: "/demo" },
]

export function Navbar() {
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const { toggleSidebar } = useSidebar()

  // Don't show the navbar on the landing page
  if (isHomePage) {
    return (
      <header className="py-4 fixed w-full z-10 transition-colors duration-300 bg-transparent">
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-white">
            AI Sales Automation
          </Link>
          <ul className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.link} className="hover:opacity-80 transition-colors text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden bg-transparent border-white text-white hover:bg-white/20"
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </nav>
      </header>
    )
  }

  // Show a different navbar for dashboard pages
  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-white z-40 px-4">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">AI Sales Automation</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.slice(1).map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.link ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/signup">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

