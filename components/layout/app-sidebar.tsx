"use client"

import Image from "next/image"
import { MessageSquarePlus, Settings, HelpCircle } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
  onNewChat?: () => void
}

export function AppSidebar({ onNewChat }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Image
          src="/halter-logo-white.svg"
          alt="Halter"
          width={100}
          height={26}
          className="h-6 w-auto"
        />
      </SidebarHeader>

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

        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <p className="px-2 py-4 text-sm text-muted-foreground text-center">
              Chat history not enabled
            </p>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="w-full">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="w-full">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
