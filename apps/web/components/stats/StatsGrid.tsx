"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Building2, Clock } from "lucide-react"


const stats = [
  {
    title: "Expedientes Activos",
    value: "3",
    description: "Expedientes activos que estan en progreso",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Proveedores",
    value: "24",
    description: "+2 nuevos proveedores",
    icon: Building2,
    color: "text-purple-500",
  },
  {
    title: "Expedientes pendientes",
    value: "18",
    description: "5 urgentes",
    icon: Clock,
    color: "text-orange-500",
  },
  {
    title: "Facturacion Mensual",
    value: "3.500 EUR",
    description: "+15% desde el mes pasado",
    icon: TrendingUp,
    color: "text-green-500",
  },
]

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-semibold text-card-foreground">{stat.title}</CardTitle>
              <Icon className={`h-10 w-10 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default StatsGrid