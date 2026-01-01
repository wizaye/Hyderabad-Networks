"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Package,
  Settings,
  BarChart3,
  FileText,
  ShoppingCart,
  Bell,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@workspace/ui/components/sidebar"

// Admin navigation data
const data = {
  user: {
    name: "Admin User",
    email: "admin@hyderabadnetworks.com",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Products",
      url: "/products",
      icon: Package,
    },
    {
      title: "Enquiries",
      url: "/enquiries",
      icon: ShoppingCart,
    },
    {
      title: "Website Content",
      url: "/content",
      icon: FileText,
    },
    {
      title: "Banners & Offers",
      url: "/banners",
      icon: BarChart3,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: BarChart3,
    },
    {
      title: "Users",
      url: "/users",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function SidebarBrand() {
  return (
    <div className="flex items-center gap-2 px-2 py-1.5 group-data-[collapsible=icon]:justify-center">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <LayoutDashboard className="h-4 w-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight min-w-0 overflow-hidden group-data-[collapsible=icon]:hidden">
        <span className="truncate font-semibold">Hyderabad Networks</span>
        <span className="truncate text-xs text-muted-foreground">Admin Panel</span>
      </div>
    </div>
  )
}

