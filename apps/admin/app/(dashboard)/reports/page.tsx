"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Download, TrendingUp, Users, ShoppingCart } from "lucide-react"
import { Button } from "@workspace/ui/components/button"

const monthlyData = [
  { month: "Jan", enquiries: 12, products: 45, revenue: 15000 },
  { month: "Feb", enquiries: 19, products: 52, revenue: 22000 },
  { month: "Mar", enquiries: 15, products: 48, revenue: 18000 },
  { month: "Apr", enquiries: 25, products: 61, revenue: 31000 },
  { month: "May", enquiries: 22, products: 55, revenue: 28000 },
  { month: "Jun", enquiries: 30, products: 68, revenue: 42000 },
]

const categoryData = [
  { name: "Wall Clocks", value: 35 },
  { name: "Table Clocks", value: 25 },
  { name: "Digital Clocks", value: 20 },
  { name: "Alarm Clocks", value: 15 },
  { name: "Others", value: 5 },
]

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

const topEnquiries = [
  { company: "ABC Retail Store", quantity: 500, amount: 125000 },
  { company: "Metro Department Stores", quantity: 1000, amount: 280000 },
  { company: "Home Decor Ltd", quantity: 300, amount: 75000 },
  { company: "Gift & Gifts", quantity: 200, amount: 42000 },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Reports & Analytics</h2>
          <p className="text-muted-foreground mt-1">View business insights and performance metrics</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Enquiries</p>
                <p className="text-3xl font-bold text-foreground mt-2">123</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Conversion Rate</p>
                <p className="text-3xl font-bold text-foreground mt-2">23%</p>
                <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg Order Value</p>
                <p className="text-3xl font-bold text-foreground mt-2">₹18.5K</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
              </div>
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-foreground mt-2">₹2.3M</p>
                <p className="text-xs text-green-600 mt-1">↑ 18% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
            <CardDescription>Revenue generated per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Product Category Distribution</CardTitle>
            <CardDescription>Enquiries by product category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Enquiries & Products</CardTitle>
            <CardDescription>Enquiries received vs products added</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                />
                <Bar dataKey="enquiries" fill="hsl(var(--chart-1))" />
                <Bar dataKey="products" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Enquiries</CardTitle>
            <CardDescription>Largest orders this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topEnquiries.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between pb-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-sm">{item.company}</p>
                    <p className="text-xs text-muted-foreground">{item.quantity} units</p>
                  </div>
                  <p className="font-bold">₹{(item.amount / 1000).toFixed(1)}K</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

