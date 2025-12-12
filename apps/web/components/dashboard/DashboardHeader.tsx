"use client"

import { Bell, Search, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const DashboardHeader = () => {
  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar clientes..." className="pl-10 bg-input" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader