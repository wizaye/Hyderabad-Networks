"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Badge } from "@workspace/ui/components/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@workspace/ui/components/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select"
import { Plus, Edit2, Trash2, Shield } from "lucide-react"
import { toast } from "sonner"
import { Spinner } from "@workspace/ui/components/spinner"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "viewer"
  status: "active" | "inactive"
  lastLogin: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@hyderabadnetworks.com",
    role: "admin",
    status: "active",
    lastLogin: "Today",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    email: "rajesh@hyderabadnetworks.com",
    role: "manager",
    status: "active",
    lastLogin: "Yesterday",
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya@hyderabadnetworks.com",
    role: "manager",
    status: "active",
    lastLogin: "2 days ago",
  },
  {
    id: "4",
    name: "Vikram Nair",
    email: "vikram@hyderabadnetworks.com",
    role: "viewer",
    status: "inactive",
    lastLogin: "1 week ago",
  },
]

const roleConfig = {
  admin: { label: "Administrator", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" },
  manager: { label: "Manager", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400" },
  viewer: { label: "Viewer", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400" },
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<User>>({})

  const openAddUser = () => {
    setSelectedUser(null)
    setFormData({
      name: "",
      email: "",
      role: "viewer",
      status: "active",
    })
    setIsDialogOpen(true)
  }

  const openEditUser = (user: User) => {
    setSelectedUser(user)
    setFormData(user)
    setIsDialogOpen(true)
  }

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      if (selectedUser) {
        setUsers(users.map((u) => (u.id === selectedUser.id ? { ...(formData as User), lastLogin: u.lastLogin } : u)))
        toast.success("User updated successfully")
      } else {
        setUsers([
          ...users,
          {
            ...(formData as User),
            id: String(users.length + 1),
            lastLogin: "Never",
          },
        ])
        toast.success("User added successfully")
      }
      setIsDialogOpen(false)
      setIsLoading(false)
    }, 500)
  }

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setIsLoading(true)
      setTimeout(() => {
        setUsers(users.filter((u) => u.id !== id))
        toast.success("User deleted successfully")
        setIsLoading(false)
      }, 500)
    }
  }

  const handleToggleStatus = (id: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setUsers(users.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u)))
      toast.success("User status updated")
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">User Management</h2>
          <p className="text-muted-foreground mt-1">Manage admin panel user accounts and permissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddUser}>
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedUser ? "Edit User" : "Add New User"}</DialogTitle>
              <DialogDescription>
                {selectedUser ? "Update user account details" : "Create a new admin user account"}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email || ""}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@hyderabadnetworks.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select
                    value={formData.role || "viewer"}
                    onValueChange={(value) => setFormData({ ...formData, role: value as any })}
                  >
                    <SelectTrigger id="role" disabled={isLoading}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="manager">Manager</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status || "active"}
                    onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger id="status" disabled={isLoading}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-400">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Roles: Admin (full access) • Manager (manage content & orders) • Viewer (view only)
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveUser} disabled={isLoading}>
                  {isLoading && <Spinner className="h-4 w-4 mr-2" />}
                  {selectedUser ? "Update User" : "Add User"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">
              {users.filter((u) => u.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{users.filter((u) => u.role === "admin").length}</div>
            <p className="text-xs text-muted-foreground mt-1">Administrators</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>Manage team members and their access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge className={roleConfig[user.role].color}>{roleConfig[user.role].label}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => openEditUser(user)} disabled={isLoading}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(user.id)}
                          disabled={isLoading}
                        >
                          {user.status === "active" ? "Disable" : "Enable"}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

