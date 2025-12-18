import DashboardProveedores from "@/components/dashboard/DashboardProveedores"
import { Proveedor } from "@/types/global"
import { cookies } from 'next/headers'
// Get Token from cookies


const ProveedoresPage = async () => {

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  // Get the list of proveedores from the database
  const request = await fetch(`${process.env.API_URL}/proveedores`,
    {
      cache: 'no-store',
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    }
  )
  const proveedores: Proveedor[] = await request.json()
  return (
    <DashboardProveedores proveedores={proveedores} />
  )


}

export default ProveedoresPage