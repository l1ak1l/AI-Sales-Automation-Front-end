"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Check, Filter, Phone } from "lucide-react"

import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

// Dummy data for leads
const dummyLeads = [
  {
    id: 1,
    name: "John Smith",
    company: "Acme Inc",
    email: "john@acme.com",
    phone: "+1 555-123-4567",
    engagementLevel: "High",
    status: "New",
    priorityScore: 92,
    lastContact: "2025-03-01",
    notes: "Interested in our enterprise plan. Has budget approval.",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "TechCorp",
    email: "sarah@techcorp.com",
    phone: "+1 555-987-6543",
    engagementLevel: "Medium",
    status: "In Progress",
    priorityScore: 78,
    lastContact: "2025-03-03",
    notes: "Requested a follow-up demo next week.",
  },
  {
    id: 3,
    name: "Michael Brown",
    company: "Global Solutions",
    email: "michael@globalsolutions.com",
    phone: "+1 555-456-7890",
    engagementLevel: "Low",
    status: "New",
    priorityScore: 45,
    lastContact: "2025-03-05",
    notes: "Initial contact made, waiting for response.",
  },
  {
    id: 4,
    name: "Emily Davis",
    company: "Innovate LLC",
    email: "emily@innovate.com",
    phone: "+1 555-789-0123",
    engagementLevel: "High",
    status: "Qualified",
    priorityScore: 88,
    lastContact: "2025-03-02",
    notes: "Ready for proposal. Decision expected within 2 weeks.",
  },
  {
    id: 5,
    name: "David Wilson",
    company: "First Choice",
    email: "david@firstchoice.com",
    phone: "+1 555-321-6547",
    engagementLevel: "Medium",
    status: "In Progress",
    priorityScore: 72,
    lastContact: "2025-03-04",
    notes: "Comparing our solution with competitors.",
  },
]

// Dummy data for follow-up tasks
const dummyTasks = [
  {
    id: 1,
    leadId: 1,
    leadName: "John Smith",
    title: "Schedule demo call",
    dueDate: "2025-03-10",
    completed: false,
    priority: "High",
  },
  {
    id: 2,
    leadId: 4,
    leadName: "Emily Davis",
    title: "Send proposal",
    dueDate: "2025-03-09",
    completed: false,
    priority: "High",
  },
  {
    id: 3,
    leadId: 2,
    leadName: "Sarah Johnson",
    title: "Follow up on demo",
    dueDate: "2025-03-15",
    completed: false,
    priority: "Medium",
  },
  {
    id: 4,
    leadId: 5,
    leadName: "David Wilson",
    title: "Share case studies",
    dueDate: "2025-03-11",
    completed: false,
    priority: "Medium",
  },
  {
    id: 5,
    leadId: 3,
    leadName: "Michael Brown",
    title: "Initial outreach call",
    dueDate: "2025-03-08",
    completed: false,
    priority: "Low",
  },
]

// Dummy insights data
const dummyInsights = [
  {
    id: 1,
    title: "High Conversion Opportunity",
    description: "John Smith has a 92% probability of conversion based on engagement patterns.",
    leadId: 1,
    type: "opportunity",
  },
  {
    id: 2,
    title: "Follow-up Needed",
    description: "Emily Davis hasn't been contacted in 5 days despite high engagement.",
    leadId: 4,
    type: "action",
  },
  {
    id: 3,
    title: "Industry Trend",
    description: "Tech sector leads are converting 15% higher than average this month.",
    leadId: null,
    type: "trend",
  },
]

export default function SalesAgentPage() {
  
  const { isAuthenticated } = useAuth(true);
  const router = useRouter();

  const [leads, setLeads] = useState(dummyLeads)
  const [tasks, setTasks] = useState(dummyTasks)
  const [insights, setInsights] = useState(dummyInsights)
  const [selectedLead, setSelectedLead] = useState<(typeof dummyLeads)[0] | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [engagementFilter, setEngagementFilter] = useState<string | null>(null)

  // Handle marking a task as complete
  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))
  }

  // Filter leads based on selected filters
  const filteredLeads = leads.filter((lead) => {
    if (statusFilter && lead.status !== statusFilter) return false
    if (engagementFilter && lead.engagementLevel !== engagementFilter) return false
    return true
  })

  // Sort leads by priority score (descending)
  const sortedLeads = [...filteredLeads].sort((a, b) => b.priorityScore - a.priorityScore)

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">AI Sales Agent</h1>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Lead Prioritization</CardTitle>
                  <CardDescription>AI-prioritized leads based on engagement and conversion probability</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Filter Leads</DialogTitle>
                        <DialogDescription>Filter leads by status and engagement level</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <h3 className="mb-2 text-sm font-medium">Status</h3>
                          <div className="flex flex-wrap gap-2">
                            {["New", "In Progress", "Qualified", "Closed"].map((status) => (
                              <Badge
                                key={status}
                                variant={statusFilter === status ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                              >
                                {status}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="mb-2 text-sm font-medium">Engagement Level</h3>
                          <div className="flex flex-wrap gap-2">
                            {["Low", "Medium", "High"].map((level) => (
                              <Badge
                                key={level}
                                variant={engagementFilter === level ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setEngagementFilter(engagementFilter === level ? null : level)}
                              >
                                {level}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setStatusFilter(null)
                            setEngagementFilter(null)
                          }}
                        >
                          Reset
                        </Button>
                        <Button>Apply Filters</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLeads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>{lead.name}</TableCell>
                        <TableCell>{lead.company}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              lead.engagementLevel === "High"
                                ? "default"
                                : lead.engagementLevel === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {lead.engagementLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>{lead.status}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: `${lead.priorityScore}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm">{lead.priorityScore}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setSelectedLead(lead)}>
                              View
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Phone className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Actionable Insights</CardTitle>
                <CardDescription>AI-generated recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight) => (
                    <div
                      key={insight.id}
                      className={`p-3 rounded-lg border ${
                        insight.type === "opportunity"
                          ? "bg-green-50 border-green-200"
                          : insight.type === "action"
                            ? "bg-blue-50 border-blue-200"
                            : "bg-amber-50 border-amber-200"
                      }`}
                    >
                      <h3 className="font-medium mb-1">{insight.title}</h3>
                      <p className="text-sm text-gray-700">{insight.description}</p>
                      {insight.leadId && (
                        <Button
                          variant="link"
                          className="p-0 h-auto text-sm"
                          onClick={() => setSelectedLead(leads.find((l) => l.id === insight.leadId) || null)}
                        >
                          View Lead
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Follow-Up Tasks</CardTitle>
            <CardDescription>AI-recommended follow-up actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lead</TableHead>
                  <TableHead>Task</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks
                  .filter((task) => !task.completed)
                  .map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.leadName}</TableCell>
                      <TableCell>{task.title}</TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            task.priority === "High"
                              ? "destructive"
                              : task.priority === "Medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1"
                          onClick={() => handleCompleteTask(task.id)}
                        >
                          <Check className="h-4 w-4" />
                          Mark Complete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedLead && (
          <Dialog open={!!selectedLead} onOpenChange={(open) => !open && setSelectedLead(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Lead Details</DialogTitle>
                <DialogDescription>Detailed information and interaction history</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Name:</span>
                      <span className="col-span-2">{selectedLead.name}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Company:</span>
                      <span className="col-span-2">{selectedLead.company}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Email:</span>
                      <span className="col-span-2">{selectedLead.email}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Phone:</span>
                      <span className="col-span-2">{selectedLead.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Lead Information</h3>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Status:</span>
                      <span className="col-span-2">{selectedLead.status}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Engagement:</span>
                      <span className="col-span-2">{selectedLead.engagementLevel}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Priority Score:</span>
                      <span className="col-span-2">{selectedLead.priorityScore}</span>
                    </div>
                    <div className="grid grid-cols-3">
                      <span className="text-sm font-medium text-gray-500">Last Contact:</span>
                      <span className="col-span-2">{selectedLead.lastContact}</span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-medium mb-2">Notes</h3>
                  <p className="text-sm">{selectedLead.notes}</p>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <Button variant="outline" onClick={() => setSelectedLead(null)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button>
                    <Phone className="h-4 w-4 mr-2" />
                    Call Lead
                  </Button>
                  <Button variant="secondary">Add Task</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Comments for future backend integration */}
        {/* 
          TODO: Backend Integration Points:
          1. Replace dummy leads with API call to fetch real leads
          2. Implement actual lead prioritization algorithm
          3. Connect task management to backend services
          4. Implement real-time insights generation
          5. Add actual calling functionality
          6. Implement lead filtering with backend API
        */}
      </div>
    </DashboardLayout>
  )
}

