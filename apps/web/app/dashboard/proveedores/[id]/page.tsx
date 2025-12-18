
import ProveedoresInfo from '@/components/dashboard/proveedores/ProveedoresInfo'
import { cookies } from 'next/headers'

type PageProps = {
  params: Promise<{
    id: string
  }>
}


const ProveedoresPage = async ({ params }:
  PageProps
) => {
  const { id } = await params

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  const request = await fetch(`${process.env.API_URL}/proveedores/${id}`,
    {
      cache: 'no-store',
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }
  )

  const proveedor = await request.json()
  return (
    <ProveedoresInfo proveedor={proveedor} />
  )
}

export default ProveedoresPage
