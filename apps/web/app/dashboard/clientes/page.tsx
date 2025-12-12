import DashboardClientes from '@/components/dashboard/DashboardClientes'
import { Cliente } from '@/types/global'

const page = async () => {

  // Get the list of clientes from the database
  const request = await fetch(`${process.env.API_URL}/clientes`,
    {
      cache: 'no-store',
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const clientes: Cliente[] = await request.json()

  return (
    <DashboardClientes clientes={clientes} />
  )
}

export default page