"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { ChatContainer } from "@/components/chat/chat-container"
import { ChatProvider } from "@/lib/chat-context"

export default function Page() {
  return (
    <ChatProvider>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <SidebarInset>
          <ChatContainer />
        </SidebarInset>
      </SidebarProvider>
    </ChatProvider>
  )
}
