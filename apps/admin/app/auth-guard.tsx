"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@workspace/ui/components/spinner"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)
  const [hasChecked, setHasChecked] = useState(false)

  useEffect(() => {
    let mounted = true

    const checkAuth = async () => {
      const supabase = createClient()
      const isAuthPage = pathname === "/login" || pathname === "/register"

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (mounted) {
          if (isAuthPage) {
            // If user is authenticated and on auth page, redirect to dashboard
            if (user) {
              router.push("/")
              return
            }
            // If not authenticated and on auth page, allow access
            setIsLoading(false)
            setHasChecked(true)
            return
          }

          // If not authenticated and not on auth page, redirect to login
          if (!user) {
            router.push("/login")
            return
          }

          // User is authenticated and not on auth page, allow access
          setIsLoading(false)
          setHasChecked(true)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        if (mounted) {
          if (!isAuthPage) {
            router.push("/login")
          } else {
            setIsLoading(false)
            setHasChecked(true)
          }
        }
      }
    }

    checkAuth()

    return () => {
      mounted = false
    }
  }, [pathname, router])

  if (isLoading || !hasChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <Spinner className="h-8 w-8 mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

