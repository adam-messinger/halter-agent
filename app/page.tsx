"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ChatContainer } from "@/components/chat/chat-container"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ChatContainer />
      </SidebarInset>
    </SidebarProvider>
  )
}
