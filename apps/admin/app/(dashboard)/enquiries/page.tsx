"use client"

import { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@workspace/ui/components/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Search, Mail, Phone, Eye, Download } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Spinner } from "@workspace/ui/components/spinner"
import { Badge } from "@workspace/ui/components/badge"

interface Enquiry {
  id: string
  company_name: string
  contact_person: string
  email: string
  phone: string
  product_category: string
  quantity: string
  message: string
  status: "new" | "contacted" | "quote_sent" | "completed"
  created_at: string
}

const statusConfig = {
  new: { label: "New", variant: "destructive" as const },
  contacted: { label: "Contacted", variant: "default" as const },
  quote_sent: { label: "Quote Sent", variant: "secondary" as const },
  completed: { label: "Completed", variant: "outline" as const },
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false })

        if (error) throw error
        setEnquiries(data || [])
      } catch (error) {
        console.error("Error fetching enquiries:", error)
        toast.error("Failed to load enquiries")
      } finally {
        setIsLoading(false)
      }
    }

    fetchEnquiries()

    const subscription = supabase
      .channel("enquiries")
      .on("postgres_changes", { event: "*", schema: "public", table: "enquiries" }, (payload: RealtimePostgresChangesPayload<Enquiry>) => {
        if (payload.eventType === "INSERT") {
          setEnquiries((prev) => [payload.new as Enquiry, ...prev])
          toast.success("New enquiry received!")
        } else if (payload.eventType === "UPDATE") {
          setEnquiries((prev) => prev.map((e) => (e.id === payload.new.id ? (payload.new as Enquiry) : e)))
        } else if (payload.eventType === "DELETE") {
          setEnquiries((prev) => prev.filter((e) => e.id !== payload.old.id))
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchesSearch =
        e.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.contact_person.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.phone.includes(searchQuery)

      const matchesStatus = statusFilter === "all" || e.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [enquiries, searchQuery, statusFilter])

  const statusStats = {
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    quote_sent: enquiries.filter((e) => e.status === "quote_sent").length,
    completed: enquiries.filter((e) => e.status === "completed").length,
  }

  const handleStatusUpdate = async (enquiryId: string, newStatus: string) => {
    setIsUpdating(true)
    try {
      const { error } = await supabase.from("enquiries").update({ status: newStatus }).eq("id", enquiryId)

      if (error) throw error
      toast.success(`Enquiry status updated to ${newStatus}`)
    } catch (error: any) {
      toast.error(error.message || "Failed to update status")
    } finally {
      setIsUpdating(false)
    }
  }

  const handleExport = () => {
    const headers = ["Company", "Contact", "Email", "Phone", "Product", "Quantity", "Status", "Date"]
    const rows = enquiries.map((e) => [
      e.company_name,
      e.contact_person,
      e.email,
      e.phone,
      e.product_category,
      e.quantity,
      e.status,
      e.created_at,
    ])

    const csvContent = [
      headers.map((h) => `"${h}"`).join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n")

    const element = document.createElement("a")
    element.setAttribute("href", `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`)
    element.setAttribute("download", `enquiries-${new Date().toISOString().split("T")[0]}.csv`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast.success("Enquiries exported successfully")
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Bulk Enquiries</h2>
          <p className="text-muted-foreground mt-1">Manage customer bulk order enquiries in real-time</p>
        </div>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "New", count: statusStats.new, status: "new" },
          { label: "Contacted", count: statusStats.contacted, status: "contacted" },
          { label: "Quote Sent", count: statusStats.quote_sent, status: "quote_sent" },
          { label: "Completed", count: statusStats.completed, status: "completed" },
        ].map((stat) => (
          <Card
            key={stat.status}
            className="cursor-pointer hover:shadow-md transition-all border border-border hover:border-primary/50"
            onClick={() => setStatusFilter(stat.status === "all" ? "all" : stat.status)}
          >
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-foreground">{stat.count}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.label} Enquiries</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company, contact, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="quote_sent">Quote Sent</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Enquiries List</CardTitle>
          <CardDescription>{filteredEnquiries.length} enquiries found</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredEnquiries.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No enquiries found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell className="font-medium">{enquiry.company_name}</TableCell>
                      <TableCell>{enquiry.contact_person}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{enquiry.email}</TableCell>
                      <TableCell className="text-sm">{enquiry.phone}</TableCell>
                      <TableCell>{enquiry.product_category}</TableCell>
                      <TableCell>{enquiry.quantity}</TableCell>
                      <TableCell>
                        <Select
                          value={enquiry.status}
                          onValueChange={(value) => handleStatusUpdate(enquiry.id, value)}
                          disabled={isUpdating}
                        >
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="quote_sent">Quote Sent</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedEnquiry(enquiry)
                              setIsDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              window.location.href = `mailto:${enquiry.email}?subject=Re: Your Clock Order Enquiry`
                            }}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEnquiry?.company_name}</DialogTitle>
            <DialogDescription>Enquiry Details & Communication</DialogDescription>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Person</p>
                  <p className="font-medium">{selectedEnquiry.contact_person}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedEnquiry.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(selectedEnquiry.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">Product Requirement</p>
                <p className="font-medium mb-1">{selectedEnquiry.product_category}</p>
                <p className="text-sm text-muted-foreground mb-3">Quantity: {selectedEnquiry.quantity}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <p className="text-sm leading-relaxed">{selectedEnquiry.message}</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-3">Status</p>
                <Badge variant={statusConfig[selectedEnquiry.status].variant}>
                  {statusConfig[selectedEnquiry.status].label}
                </Badge>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  className="flex-1"
                  onClick={() => {
                    window.location.href = `mailto:${selectedEnquiry.email}?subject=Re: Your Clock Order Enquiry`
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => {
                    window.location.href = `tel:${selectedEnquiry.phone}`
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

