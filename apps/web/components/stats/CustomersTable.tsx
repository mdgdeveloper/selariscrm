"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"

const customers = [
  { id: 1, name: "Sarah Johnson", email: "sarah@example.com", status: "Active", loanAmount: "$450,000", progress: 75 },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    status: "Pending",
    loanAmount: "$320,000",
    progress: 45,
  },
  { id: 3, name: "Emma Williams", email: "emma@example.com", status: "Active", loanAmount: "$580,000", progress: 90 },
  {
    id: 4,
    name: "James Rodriguez",
    email: "james@example.com",
    status: "In Review",
    loanAmount: "$410,000",
    progress: 60,
  },
  { id: 5, name: "Lisa Anderson", email: "lisa@example.com", status: "Active", loanAmount: "$275,000", progress: 85 },
]

export function CustomersTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "In Review":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-card-foreground">Clientes activos</CardTitle>
        <CardDescription>Solicitudes de hipoteca activas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-card-foreground">Nombre</th>
                <th className="text-left py-3 px-4 font-semibold text-card-foreground">Valor del préstamo</th>
                <th className="text-left py-3 px-4 font-semibold text-card-foreground">Estado</th>
                <th className="text-left py-3 px-4 font-semibold text-card-foreground">Progreso</th>
                <th className="text-right py-3 px-4 font-semibold text-card-foreground">Acción</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b border-border hover:bg-muted transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-card-foreground">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-card-foreground font-semibold">{customer.loanAmount}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className={getStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${customer.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">{customer.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
