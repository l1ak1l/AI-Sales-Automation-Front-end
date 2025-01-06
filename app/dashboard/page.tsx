"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Navbar } from "@/components/navbar"

const data = [
  { month: "Jan", sales: 4000, calls: 240 },
  { month: "Feb", sales: 3000, calls: 198 },
  { month: "Mar", sales: 2000, calls: 980 },
  { month: "Apr", sales: 2780, calls: 390 },
  { month: "May", sales: 1890, calls: 480 },
  { month: "Jun", sales: 2390, calls: 380 },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navbar />
      <div className="p-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Sales Reports</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-white/80 text-gray-900 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Total Sales</CardTitle>
                <CardDescription>Current month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">$16,060</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 text-gray-900 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Total Calls</CardTitle>
                <CardDescription>Current month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">2,668</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 text-gray-900 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
                <CardDescription>Current month</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-gray-900">24.5%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 mt-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Call Volume</CardTitle>
                <CardDescription>Monthly call statistics</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="calls" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
