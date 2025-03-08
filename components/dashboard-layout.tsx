"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>
        <div className="pt-16">
          <div className="flex-1 overflow-auto p-4 md:p-6">{children}</div>
        </div>
      </SidebarInset>
    </>
  )
}

