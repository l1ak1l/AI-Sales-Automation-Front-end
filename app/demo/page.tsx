"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // Add your demo booking logic here
    setTimeout(() => {
      setIsLoading(false)
      router.push('/voice-demo')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">Book a Demo</CardTitle>
            <CardDescription>Schedule a demonstration of our voice agent platform</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" required className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex space-x-2">
                    <Select>
                      <SelectTrigger className="w-[100px] rounded-xl">
                        <SelectValue placeholder="+1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+91">+91</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input id="phone" type="tel" placeholder="Enter phone number" className="flex-1 rounded-xl" required />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Product Name</Label>
                <Input id="product" placeholder="Enter product name" required className="rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe your product and requirements"
                  className="min-h-[100px] rounded-xl"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-xl" disabled={isLoading}>
                {isLoading ? "Scheduling..." : "Schedule Demo Call"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
