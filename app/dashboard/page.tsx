"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Upload,
  FileText,
  FileSpreadsheet,
  File,
  Download,
  Trash2,
  Eye,
  Filter,
  ArrowUpDown,
  Calendar,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dummy data for uploaded files
const uploadedData = [
  {
    id: 1,
    name: "Customer_Calls_July2025.csv",
    type: "csv",
    size: "4.2 MB",
    uploadDate: "2025-07-15",
    status: "Processed",
    category: "Call Data",
    records: 1250,
  },
  {
    id: 2,
    name: "Sales_Leads_Q2.xlsx",
    type: "xlsx",
    size: "2.8 MB",
    uploadDate: "2025-07-10",
    status: "Processed",
    category: "Lead Data",
    records: 845,
  },
  {
    id: 3,
    name: "Marketing_Campaign_Results.csv",
    type: "csv",
    size: "1.5 MB",
    uploadDate: "2025-07-08",
    status: "Processed",
    category: "Marketing Data",
    records: 532,
  },
  {
    id: 4,
    name: "Customer_Feedback_Recordings.zip",
    type: "zip",
    size: "78.3 MB",
    uploadDate: "2025-07-05",
    status: "Processing",
    category: "Audio Data",
    records: 45,
  },
  {
    id: 5,
    name: "Product_Images_Batch3.zip",
    type: "zip",
    size: "124.7 MB",
    uploadDate: "2025-07-03",
    status: "Processed",
    category: "Image Data",
    records: 87,
  },
  {
    id: 6,
    name: "Customer_Survey_Responses.json",
    type: "json",
    size: "3.1 MB",
    uploadDate: "2025-06-28",
    status: "Processed",
    category: "Survey Data",
    records: 1024,
  },
  {
    id: 7,
    name: "Sales_Team_Performance.xlsx",
    type: "xlsx",
    size: "1.8 MB",
    uploadDate: "2025-06-25",
    status: "Processed",
    category: "Performance Data",
    records: 32,
  },
  {
    id: 8,
    name: "Website_Traffic_Analytics.csv",
    type: "csv",
    size: "5.4 MB",
    uploadDate: "2025-06-20",
    status: "Failed",
    category: "Analytics Data",
    records: 0,
  },
  {
    id: 9,
    name: "Product_Catalog_Updated.json",
    type: "json",
    size: "8.7 MB",
    uploadDate: "2025-06-15",
    status: "Processed",
    category: "Product Data",
    records: 1543,
  },
  {
    id: 10,
    name: "Customer_Support_Tickets.csv",
    type: "csv",
    size: "2.3 MB",
    uploadDate: "2025-06-10",
    status: "Processed",
    category: "Support Data",
    records: 678,
  },
]

// Function to get the appropriate icon based on file type
const getFileIcon = (type: string) => {
  switch (type) {
    case "csv":
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />
    case "xlsx":
      return <FileSpreadsheet className="h-5 w-5 text-blue-500" />
    case "json":
      return <FileText className="h-5 w-5 text-amber-500" />
    case "zip":
      return <File className="h-5 w-5 text-purple-500" />
    default:
      return <File className="h-5 w-5 text-gray-500" />
  }
}

// Function to get the appropriate status badge
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Processed":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          Processed
        </Badge>
      )
    case "Processing":
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Processing
        </Badge>
      )
    case "Failed":
      return (
        <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function DashboardPage() {
  const { isAuthenticated } = useAuth()
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string>("uploadDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Animation to simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort data
  const filteredData = uploadedData
    .filter((item) => {
      // Apply search filter
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Apply category filter
      if (categoryFilter && item.category !== categoryFilter) {
        return false
      }

      // Apply status filter
      if (statusFilter && item.status !== statusFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === "name") {
        return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      } else if (sortField === "size") {
        const aSize = Number.parseFloat(a.size.split(" ")[0])
        const bSize = Number.parseFloat(b.size.split(" ")[0])
        return sortDirection === "asc" ? aSize - bSize : bSize - aSize
      } else if (sortField === "uploadDate") {
        return sortDirection === "asc"
          ? new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime()
          : new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      } else if (sortField === "records") {
        return sortDirection === "asc" ? a.records - b.records : b.records - a.records
      }
      return 0
    })

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Get unique categories for filter
  const categories = Array.from(new Set(uploadedData.map((item) => item.category)))

  // Get unique statuses for filter
  const statuses = Array.from(new Set(uploadedData.map((item) => item.status)))

  // Handle sort toggle
  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Data Dashboard</h1>
            <p className="text-muted-foreground">View and manage all your uploaded data files</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload New Data
            </Button>
          </div>
        </div>

        <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Browse, filter, and manage all your uploaded data files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search files..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={categoryFilter || "all"}
                      onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select
                      value={statusFilter || "all"}
                      onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[400px]">
                          <Button
                            variant="ghost"
                            className="flex items-center gap-1 p-0 font-medium"
                            onClick={() => toggleSort("name")}
                          >
                            File Name
                            <ArrowUpDown className="h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            className="flex items-center gap-1 p-0 font-medium"
                            onClick={() => toggleSort("uploadDate")}
                          >
                            Upload Date
                            <ArrowUpDown className="h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            className="flex items-center gap-1 p-0 font-medium"
                            onClick={() => toggleSort("size")}
                          >
                            Size
                            <ArrowUpDown className="h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            className="flex items-center gap-1 p-0 font-medium"
                            onClick={() => toggleSort("records")}
                          >
                            Records
                            <ArrowUpDown className="h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.length > 0 ? (
                        paginatedData.map((file) => (
                          <TableRow key={file.id} className="group">
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                {getFileIcon(file.type)}
                                <span className="truncate max-w-[300px]">{file.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{file.category}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                {new Date(file.uploadDate).toLocaleDateString()}
                              </div>
                            </TableCell>
                            <TableCell>{file.size}</TableCell>
                            <TableCell>{file.records.toLocaleString()}</TableCell>
                            <TableCell>{getStatusBadge(file.status)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <Filter className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <Download className="mr-2 h-4 w-4" />
                                    <span>Download</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="cursor-pointer text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Delete</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            No results found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{paginatedData.length}</strong> of <strong>{filteredData.length}</strong> files
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages || 1}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>Data Upload Statistics</CardTitle>
                <CardDescription>Summary of your data uploads and processing status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 flex flex-col">
                    <span className="text-blue-500 text-sm font-medium">Total Files</span>
                    <span className="text-2xl font-bold mt-1">{uploadedData.length}</span>
                    <span className="text-sm text-muted-foreground mt-1">Across {categories.length} categories</span>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 flex flex-col">
                    <span className="text-green-500 text-sm font-medium">Processed</span>
                    <span className="text-2xl font-bold mt-1">
                      {uploadedData.filter((item) => item.status === "Processed").length}
                    </span>
                    <span className="text-sm text-muted-foreground mt-1">Ready for analysis</span>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4 flex flex-col">
                    <span className="text-amber-500 text-sm font-medium">Processing</span>
                    <span className="text-2xl font-bold mt-1">
                      {uploadedData.filter((item) => item.status === "Processing").length}
                    </span>
                    <span className="text-sm text-muted-foreground mt-1">Currently being processed</span>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4 flex flex-col">
                    <span className="text-red-500 text-sm font-medium">Failed</span>
                    <span className="text-2xl font-bold mt-1">
                      {uploadedData.filter((item) => item.status === "Failed").length}
                    </span>
                    <span className="text-sm text-muted-foreground mt-1">Requires attention</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}

