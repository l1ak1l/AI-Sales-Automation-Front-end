"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import {
  Upload,
  FileText,
  FileSpreadsheet,
  File,
  Download,
  Trash2,
  Eye,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Database,
  RefreshCw,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Dummy data for CRM platforms
const crmPlatforms = [
  { id: 1, name: "Salesforce", connected: false },
  { id: 2, name: "HubSpot", connected: false },
  { id: 3, name: "Zoho CRM", connected: false },
  { id: 4, name: "Pipedrive", connected: false },
  { id: 5, name: "Freshsales", connected: false },
]

// Dummy data for CRM fields
const crmFields = [
  { id: 1, originalName: "first_name", standardName: "firstName", override: "" },
  { id: 2, originalName: "last_name", standardName: "lastName", override: "" },
  { id: 3, originalName: "email", standardName: "email", override: "" },
  { id: 4, originalName: "phone", standardName: "phoneNumber", override: "" },
  { id: 5, originalName: "company", standardName: "companyName", override: "" },
  { id: 6, originalName: "job_title", standardName: "jobTitle", override: "" },
  { id: 7, originalName: "lead_source", standardName: "leadSource", override: "" },
  { id: 8, originalName: "lead_status", standardName: "leadStatus", override: "" },
]

// Dummy data for extraction logs
const extractionLogs = [
  { id: 1, timestamp: "2025-03-07 10:15:22", message: "Started data extraction from Salesforce", type: "info" },
  { id: 2, timestamp: "2025-03-07 10:15:45", message: "Successfully extracted 245 contacts", type: "success" },
  { id: 3, timestamp: "2025-03-07 10:16:12", message: "Failed to map field 'custom_field_1'", type: "error" },
  { id: 4, timestamp: "2025-03-07 10:17:30", message: "Completed data extraction and mapping", type: "success" },
  { id: 5, timestamp: "2025-03-07 11:30:15", message: "Started data extraction from HubSpot", type: "info" },
  { id: 6, timestamp: "2025-03-07 11:31:22", message: "Successfully extracted 189 contacts", type: "success" },
]

// Dummy data for uploaded files
const uploadedFiles = [
  {
    id: 1,
    name: "Customer_Data_Import.csv",
    type: "csv",
    size: "3.2 MB",
    uploadDate: "2025-03-15",
    status: "Processed",
    destination: "Salesforce",
    records: 450,
    progress: 100,
  },
  {
    id: 2,
    name: "Leads_March2025.xlsx",
    type: "xlsx",
    size: "1.8 MB",
    uploadDate: "2025-03-14",
    status: "Processed",
    destination: "HubSpot",
    records: 215,
    progress: 100,
  },
  {
    id: 3,
    name: "Marketing_Contacts.csv",
    type: "csv",
    size: "4.5 MB",
    uploadDate: "2025-03-12",
    status: "Processing",
    destination: "Zoho CRM",
    records: 780,
    progress: 65,
  },
  {
    id: 4,
    name: "Sales_Opportunities_Q1.xlsx",
    type: "xlsx",
    size: "2.3 MB",
    uploadDate: "2025-03-10",
    status: "Failed",
    destination: "Pipedrive",
    records: 0,
    progress: 100,
  },
  {
    id: 5,
    name: "Support_Tickets.csv",
    type: "csv",
    size: "1.1 MB",
    uploadDate: "2025-03-08",
    status: "Queued",
    destination: "Freshsales",
    records: 0,
    progress: 0,
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
    default:
      return <File className="h-5 w-5 text-gray-500" />
  }
}

// Function to get the appropriate status badge and icon
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Processed":
      return (
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Processed
          </Badge>
        </div>
      )
    case "Processing":
      return (
        <div className="flex items-center gap-1.5">
          <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            Processing
          </Badge>
        </div>
      )
    case "Failed":
      return (
        <div className="flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            Failed
          </Badge>
        </div>
      )
    case "Queued":
      return (
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-amber-500" />
          <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Queued
          </Badge>
        </div>
      )
    case "Uploaded":
      return (
        <div className="flex items-center gap-1.5">
          <Upload className="h-4 w-4 text-gray-500" />
          <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
            Uploaded
          </Badge>
        </div>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function CRMIntegrationPage() {
  // Remove the true parameter to not require authentication
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const [platforms, setPlatforms] = useState(crmPlatforms)
  const [fields, setFields] = useState(crmFields)
  const [logs, setLogs] = useState(extractionLogs)
  const [files, setFiles] = useState(uploadedFiles)
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(undefined)
  const [apiKey, setApiKey] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Handle connecting to a CRM platform
  const handleConnect = (platformId: number) => {
    // In a real application, this would validate the API key and connect to the CRM
    // For now, we'll just update the state to simulate a successful connection
    setPlatforms(
      platforms.map((platform) => (platform.id === platformId ? { ...platform, connected: true } : platform)),
    )

    // Add a log entry
    const platform = platforms.find((p) => p.id === platformId)
    if (platform) {
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        message: `Connected to ${platform.name}`,
        type: "success",
      }
      setLogs([newLog, ...logs])
    }

    // Reset form
    setSelectedPlatform(undefined)
    setApiKey("")
  }

  // Handle updating a field override
  const handleFieldOverride = (fieldId: number, value: string) => {
    setFields(fields.map((field) => (field.id === fieldId ? { ...field, override: value } : field)))
  }

  // Handle saving field mappings
  const handleSaveMapping = () => {
    // In a real application, this would save the field mappings to the backend
    // For now, we'll just add a log entry to simulate a successful save
    const newLog = {
      id: logs.length + 1,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      message: "Saved field mappings",
      type: "success",
    }
    setLogs([newLog, ...logs])

    // Show an alert for demonstration purposes
    alert("Field mappings saved successfully!")
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }

  // Handle file upload
  const handleFileUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Add the file to the list
      const fileType = selectedFile.name.split(".").pop() || ""
      const newFile = {
        id: files.length + 1,
        name: selectedFile.name,
        type: fileType,
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split("T")[0],
        status: "Uploaded",
        destination: "",
        records: 0,
        progress: 0,
      }

      setFiles([newFile, ...files])

      // Add a log entry
      const newLog = {
        id: logs.length + 1,
        timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        message: `Uploaded file ${selectedFile.name}`,
        type: "info",
      }
      setLogs([newLog, ...logs])

      // Reset form
      setSelectedFile(null)
      setIsUploading(false)

      // Reset the file input
      const fileInput = document.getElementById("file-upload") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    }, 3000)
  }

  // Add a function to start processing a file
  const startProcessing = (fileId: number) => {
    // Find the file and update its status
    setFiles(
      files.map((file) => {
        if (file.id === fileId) {
          // Add a log entry
          const newLog = {
            id: logs.length + 1,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
            message: `Started processing file ${file.name}`,
            type: "info",
          }
          setLogs([newLog, ...logs])

          return { ...file, status: "Processing", progress: 0 }
        }
        return file
      }),
    )

    // Simulate processing progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      if (progress >= 100) {
        clearInterval(interval)

        // Update the file status to Processed when done
        setFiles(
          files.map((file) => {
            if (file.id === fileId) {
              // Add a log entry
              const newLog = {
                id: logs.length + 1,
                timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
                message: `Completed processing file ${file.name}`,
                type: "success",
              }
              setLogs([newLog, ...logs])

              return {
                ...file,
                status: "Processed",
                progress: 100,
                records: Math.floor(Math.random() * 1000) + 100, // Random number of records
              }
            }
            return file
          }),
        )
      } else {
        // Update progress
        setFiles(
          files.map((file) => {
            if (file.id === fileId) {
              return { ...file, progress }
            }
            return file
          }),
        )
      }
    }, 300)
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">CRM Data Integration</h1>

        <Tabs defaultValue="connect" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="connect">Connect CRM</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
            <TabsTrigger value="data-management">Data Management</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="connect">
            <Card>
              <CardHeader>
                <CardTitle>Connect to CRM Platform</CardTitle>
                <CardDescription>Set up connections to your CRM platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-center gap-4">
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Select CRM" />
                      </SelectTrigger>
                      <SelectContent>
                        {platforms.map((platform) => (
                          <SelectItem key={platform.id} value={platform.id.toString()}>
                            {platform.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Enter API Key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => handleConnect(Number(selectedPlatform))}
                      disabled={!selectedPlatform || !apiKey}
                    >
                      Connect
                    </Button>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Platform</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {platforms.map((platform) => (
                        <TableRow key={platform.id}>
                          <TableCell>{platform.name}</TableCell>
                          <TableCell>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${platform.connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              {platform.connected ? "Connected" : "Not Connected"}
                            </span>
                          </TableCell>
                          <TableCell>
                            {platform.connected ? (
                              <Button variant="outline" size="sm">
                                Disconnect
                              </Button>
                            ) : (
                              <Button size="sm" onClick={() => setSelectedPlatform(platform.id.toString())}>
                                Connect
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mapping">
            <Card>
              <CardHeader>
                <CardTitle>Field Mapping</CardTitle>
                <CardDescription>Map CRM fields to standardized fields</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Original Field</TableHead>
                      <TableHead>Standardized Field</TableHead>
                      <TableHead>Override</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field) => (
                      <TableRow key={field.id}>
                        <TableCell>{field.originalName}</TableCell>
                        <TableCell>{field.standardName}</TableCell>
                        <TableCell>
                          <Input
                            placeholder="Custom mapping"
                            value={field.override}
                            onChange={(e) => handleFieldOverride(field.id, e.target.value)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-end">
                  <Button onClick={handleSaveMapping}>Save Mapping</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data-management">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Upload and manage data files for CRM integration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="p-6 border border-dashed rounded-lg bg-gray-50">
                    <div className="flex flex-col items-center text-center">
                      <Database className="h-10 w-10 text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Upload Data File</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Upload CSV, Excel, or JSON files to import into your CRM
                      </p>

                      <div className="w-full max-w-md space-y-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="file-upload" className="text-sm font-medium text-left">
                            Select File
                          </label>
                          <Input
                            id="file-upload"
                            type="file"
                            accept=".csv,.xlsx,.xls,.json"
                            onChange={handleFileChange}
                          />
                        </div>

                        {isUploading && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <Progress value={uploadProgress} className="h-2" />
                          </div>
                        )}

                        <Button className="w-full" onClick={handleFileUpload} disabled={!selectedFile || isUploading}>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload File
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead>Upload Date</TableHead>
                            <TableHead>Size</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Records</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {files.map((file) => (
                            <TableRow key={file.id}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getFileIcon(file.type)}
                                  <span className="font-medium">{file.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                                  {file.uploadDate}
                                </div>
                              </TableCell>
                              <TableCell>{file.size}</TableCell>
                              <TableCell>{getStatusBadge(file.status)}</TableCell>
                              <TableCell>
                                {file.status === "Processing" ? (
                                  <div className="flex items-center gap-2">
                                    <Progress value={file.progress} className="h-2 w-16" />
                                    <span className="text-xs text-muted-foreground">{file.progress}%</span>
                                  </div>
                                ) : (
                                  file.records.toLocaleString()
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  {file.status === "Uploaded" && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="flex items-center gap-1"
                                      onClick={() => startProcessing(file.id)}
                                    >
                                      <RefreshCw className="h-3.5 w-3.5" />
                                      Process
                                    </Button>
                                  )}
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <File className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="cursor-pointer">
                                        <Eye className="mr-2 h-4 w-4" />
                                        <span>View Details</span>
                                      </DropdownMenuItem>
                                      {file.status === "Processed" && (
                                        <DropdownMenuItem className="cursor-pointer">
                                          <Download className="mr-2 h-4 w-4" />
                                          <span>Download</span>
                                        </DropdownMenuItem>
                                      )}
                                      {file.status === "Failed" && (
                                        <DropdownMenuItem className="cursor-pointer">
                                          <RefreshCw className="mr-2 h-4 w-4" />
                                          <span>Retry</span>
                                        </DropdownMenuItem>
                                      )}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="cursor-pointer text-red-600">
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        <span>Delete</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
                <CardDescription>View recent CRM integration activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] overflow-y-auto border rounded-md p-4">
                  {logs.map((log) => (
                    <div
                      key={log.id}
                      className={`mb-2 p-2 rounded-md ${
                        log.type === "error"
                          ? "bg-red-50 text-red-800"
                          : log.type === "success"
                            ? "bg-green-50 text-green-800"
                            : "bg-blue-50 text-blue-800"
                      }`}
                    >
                      <span className="text-xs font-mono">{log.timestamp}</span>
                      <p>{log.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

