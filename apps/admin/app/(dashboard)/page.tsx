"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Package, Mail, TrendingUp, AlertCircle } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Button } from "@workspace/ui/components/button"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@workspace/ui/components/spinner"

const dashboardData = [
  { month: "Jan", enquiries: 12, products: 45 },
  { month: "Feb", enquiries: 19, products: 52 },
  { month: "Mar", enquiries: 15, products: 48 },
  { month: "Apr", enquiries: 25, products: 61 },
  { month: "May", enquiries: 22, products: 55 },
  { month: "Jun", enquiries: 30, products: 68 },
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState([
    { title: "Total Products", value: "0", change: "Loading...", icon: Package, href: "/products" },
    { title: "Pending Enquiries", value: "0", change: "Loading...", icon: Mail, href: "/enquiries" },
    { title: "Active Offers", value: "0", change: "Loading...", icon: TrendingUp, href: "/banners" },
    { title: "System Status", value: "Healthy", change: "99.9% uptime", icon: AlertCircle, href: "/settings" },
  ])

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      const { data: productsData } = await supabase.from("products").select("count", { count: "exact" })
      const { data: enquiriesData } = await supabase.from("enquiries").select("count", { count: "exact" })
      const { data: bannersData } = await supabase.from("banners").select("count", { count: "exact" })

      setStats([
        {
          title: "Total Products",
          value: (productsData?.length || 0).toString(),
          change: "+12% from last month",
          icon: Package,
          href: "/products",
        },
        {
          title: "Pending Enquiries",
          value: (enquiriesData?.length || 0).toString(),
          change: "+3 today",
          icon: Mail,
          href: "/enquiries",
        },
        {
          title: "Active Offers",
          value: (bannersData?.length || 0).toString(),
          change: "2 expiring soon",
          icon: TrendingUp,
          href: "/banners",
        },
        {
          title: "System Status",
          value: "Healthy",
          change: "99.9% uptime",
          icon: AlertCircle,
          href: "/settings",
        },
      ])

      setIsLoading(false)
    }

    fetchStats()

    const supabase = createClient()
    const subscription = supabase
      .channel("dashboard")
      .on("postgres_changes", { event: "*", schema: "public" }, () => {
        fetchStats()
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground mt-2">
          Manage your clock distribution network inventory and operations in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="cursor-pointer hover:shadow-md transition-all h-full border border-border hover:border-primary/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg">Enquiries Trend</CardTitle>
            <CardDescription>Monthly bulk order enquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="enquiries"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle className="text-lg">Product Distribution</CardTitle>
            <CardDescription>Products added per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="products" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common tasks for managing your business</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/products">
              <Button variant="outline" className="w-full bg-transparent">
                <Package className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
            <Link href="/banners">
              <Button variant="outline" className="w-full bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                Create Offer
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full bg-transparent">
                Import Products
              </Button>
            </Link>
            <Link href="/reports">
              <Button variant="outline" className="w-full bg-transparent">
                View Reports
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

