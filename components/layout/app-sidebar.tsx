"use client"

import { MessageSquarePlus } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useChatActions } from "@/lib/chat-context"

export function AppSidebar() {
  const { onNewChat } = useChatActions()

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4" />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              onClick={onNewChat}
            >
              <MessageSquarePlus className="h-4 w-4" />
              New Chat
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
