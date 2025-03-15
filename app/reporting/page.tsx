"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  PieChart,
  AreaChart,
  ScatterChart,
  Bar,
  Pie,
  Area,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/hooks/useAuth";

// Dummy data for charts
const salesData = [
  { month: "Jan", sales: 4000, calls: 240, leads: 100 },
  { month: "Feb", sales: 3000, calls: 198, leads: 80 },
  { month: "Mar", sales: 2000, calls: 980, leads: 200 },
  { month: "Apr", sales: 2780, calls: 390, leads: 150 },
  { month: "May", sales: 1890, calls: 480, leads: 120 },
  { month: "Jun", sales: 2390, calls: 380, leads: 110 },
]

const productData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
]

const regionData = [
  { name: "North", sales: 4000, target: 3800 },
  { name: "South", sales: 3000, target: 3200 },
  { name: "East", sales: 2000, target: 2400 },
  { name: "West", sales: 2780, target: 2600 },
]

const customerData = [
  { satisfaction: 80, loyaltyScore: 90, size: 200 },
  { satisfaction: 75, loyaltyScore: 85, size: 150 },
  { satisfaction: 70, loyaltyScore: 80, size: 180 },
  { satisfaction: 85, loyaltyScore: 95, size: 220 },
  { satisfaction: 78, loyaltyScore: 88, size: 170 },
]

const channelData = [
  { name: "Direct", value: 400 },
  { name: "Social", value: 300 },
  { name: "Email", value: 200 },
  { name: "Affiliate", value: 100 },
]

export default function DashboardPage() {
  const [chatInput, setChatInput] = useState("")
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! How can I help you with your business report today?" },
  ])

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return

    const newMessages = [
      ...chatMessages,
      { role: "user", content: chatInput },
      { role: "assistant", content: "I'm analyzing your request. Please give me a moment..." },
    ]
    setChatMessages(newMessages)
    setChatInput("")

    // Simulate AI response (replace with actual AI integration later)
    setTimeout(() => {
      setChatMessages([
        ...newMessages.slice(0, -1),
        {
          role: "assistant",
          content:
            "Based on the dashboard, it looks like sales have been fluctuating over the past months. Product A is our best-selling item. The Western region shows the highest sales. Is there anything specific you'd like to know about these trends?",
        },
      ])
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">Business Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Total Sales</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">$16,060</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Total Calls</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">2,668</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Conversion Rate</CardTitle>
              <CardDescription>Current month</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-900">24.5%</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 mb-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Sales and Leads Overview</CardTitle>
              <CardDescription>Monthly performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    yAxisId="left"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="leads"
                    yAxisId="right"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Product Distribution</CardTitle>
              <CardDescription>Sales by product</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={productData} fill="#3B82F6" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Regional Sales vs Target</CardTitle>
              <CardDescription>Performance by region</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#3B82F6" />
                  <Bar dataKey="target" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Customer Satisfaction vs Loyalty</CardTitle>
              <CardDescription>Bubble size represents customer value</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="satisfaction" name="Satisfaction" unit="%" />
                  <YAxis type="number" dataKey="loyaltyScore" name="Loyalty Score" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter name="Customers" data={customerData} fill="#3B82F6">
                    {customerData.map((entry, index) => (
                      <Scatter key={`cell-${index}`} fill="#3B82F6" />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Sales by Channel</CardTitle>
              <CardDescription>Distribution across channels</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={channelData} fill="#3B82F6" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-sm mb-8">
          <CardHeader>
            <CardTitle>Executive Summary</CardTitle>
            <CardDescription>Key insights from the report</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Overall sales have shown a slight decline over the past 6 months, with a 5% decrease compared to the
                previous period.
              </li>
              <li>Product A continues to be our best-selling item, accounting for 33% of total sales.</li>
              <li>
                The Western region has exceeded its sales target by 7%, while other regions are slightly below their
                targets.
              </li>
              <li>
                Customer satisfaction and loyalty scores show a strong positive correlation, indicating effective
                retention strategies.
              </li>
              <li>Direct sales remain our strongest channel, contributing to 40% of total revenue.</li>
              <li>The conversion rate has improved by 2.5 percentage points, reaching 24.5% this month.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm mb-8">
          <CardHeader>
            <CardTitle>AI Chat Assistant</CardTitle>
            <CardDescription>Ask questions about your business report</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] overflow-y-auto mb-4 p-4 border border-gray-200 rounded-lg">
              {chatMessages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {message.content}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about your business report..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

