import ClienteInfo from "@/components/dashboard/clientes/ClienteInfo"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

const page = async ({ params }: PageProps) => {
  const { id } = await params

  const request = await fetch(`${process.env.API_URL}/clientes/${id}`,
    {
      cache: 'no-store',
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const cliente = await request.json()


  return (
    <ClienteInfo cliente={cliente} />
  )
}

export default page