"use client";

import { LayoutDashboard, Users, Building2, CheckSquare, FileText, Folder, BarChart3 } from "lucide-react"
import { useState } from "react";
import { useRouter } from "next/navigation";

const navItems = [
  { icon: LayoutDashboard, label: "Panel de Control", href: "/dashboard" },
  { icon: LayoutDashboard, label: "Clientes", href: "/dashboard/clientes" },
  { icon: Building2, label: "Proveedores", href: "/dashboard/proveedores" },
  { icon: Users, label: "Expedientes", href: "/dashboard/expedientes" },
  { icon: CheckSquare, label: "Tareas", href: "/dashboard/tasks" },
  { icon: FileText, label: "Facturas", href: "/dashboard/invoices" },
  { icon: Folder, label: "Documentos", href: "/dashboard/documents" },
  { icon: BarChart3, label: "Reportes", href: "/dashboard/reports" },
]


const DashboardSidebar = () => {
  const [activeItem, setActiveItem] = useState<string>("Dashboard");

  const router = useRouter();
  const handleClick = (label: string, href: string) => {
    // Push to the page selected
    router.push(href);
    setActiveItem(label);
  };
  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar text-sidebar-foreground flex flex-col">
      <div className="h-16 px-6 flex items-center border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-sm">Selaris CRM</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.label
          return (
            <button
              key={item.label}
              onClick={() => handleClick(item.label, item.href)}
              className={`cursor-pointer w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-sidebar-border space-y-2">
        <p className="text-xs text-sidebar-foreground/60 px-3 font-semibold">ACCOUNT</p>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors">
          <div className="w-6 h-6 rounded-full bg-sidebar-primary flex items-center justify-center text-xs">J</div>
          <span>John Broker</span>
        </button>
      </div>
    </aside>
  )
}

export default DashboardSidebar