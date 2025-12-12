import { CustomersTable } from "../stats/CustomersTable"
import StatsGrid from "../stats/StatsGrid"

const DashboardContent = () => {
  return (
    <main className="flex-1 overflow-auto bg-background">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bienvenido</h1>
          <p className="text-muted-foreground mt-1">Aquí está el resumen de tu panel de control</p>
        </div>

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CustomersTable />
          </div>
          <div className="space-y-6">
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardContent