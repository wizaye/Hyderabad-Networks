"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar"
import { Separator } from "@workspace/ui/components/separator"
import { Button } from "@workspace/ui/components/button"
import { Avatar, AvatarFallback } from "@workspace/ui/components/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { Bell, LogOut, Settings, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }: any) => {
      if (user) {
        setUser(user)
      }
    })
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    toast.success("Logged out successfully")
    router.push("/login")
  }

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || "AD"

  // Determine the current page title for the header
  const getPageTitle = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) {
      return 'Dashboard';
    }
    const page = pathSegments[0];
    switch (page) {
      case 'products': return 'Products';
      case 'enquiries': return 'Enquiries';
      case 'content': return 'Website Content';
      case 'banners': return 'Banners & Offers';
      case 'reports': return 'Reports';
      case 'users': return 'Users';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const getPageDescription = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length === 0) {
      return 'Manage your clock distribution network inventory and operations in real-time';
    }
    const page = pathSegments[0];
    switch (page) {
      case 'products': return 'Manage your clock product inventory';
      case 'enquiries': return 'Manage customer bulk order enquiries in real-time';
      case 'content': return 'Manage homepage and website content';
      case 'banners': return 'Manage promotional banners and special offers';
      case 'reports': return 'View business insights and performance metrics';
      case 'users': return 'Manage admin panel user accounts and permissions';
      case 'settings': return 'Manage your business settings and configuration';
      default: return 'Manage your clock distribution network inventory and operations in real-time';
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="overflow-auto">
          <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-20 border-b border-border bg-card px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{getPageTitle()}</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">{getPageDescription()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center gap-2 p-2 text-sm">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Admin User</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
            <main className="flex-1 p-6">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


