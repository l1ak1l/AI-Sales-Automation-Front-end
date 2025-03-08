"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export default function CRMIntegrationPage() {
  const [platforms, setPlatforms] = useState(crmPlatforms)
  const [fields, setFields] = useState(crmFields)
  const [logs, setLogs] = useState(extractionLogs)
  const [selectedPlatform, setSelectedPlatform] = useState<string | undefined>(undefined)
  const [apiKey, setApiKey] = useState("")

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

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-6">CRM Data Integration</h1>

        <Tabs defaultValue="connect" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="connect">Connect CRM</TabsTrigger>
            <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
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

        {/* Comments for future backend integration */}
        {/* 
          TODO: Backend Integration Points:
          1. Replace dummy CRM platforms with API call to fetch available integrations
          2. Implement actual CRM connection logic with API key validation
          3. Fetch real field mappings from the backend
          4. Implement real-time activity logging
          5. Add error handling for API failures
        */}
      </div>
    </DashboardLayout>
  )
}

