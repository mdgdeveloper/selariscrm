import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest, { params }: {
  params: Promise<{
    id: string
  }>
}) {

  const body = await req.json();
  const id = (await params).id;
  // Convert body to data: { body }
  const data = { data: body };

  // Convert body.data.fechaNacimiento to ISO string if it exists
  if (body.fechaNacimiento) {
    data.data.fechaNacimiento = new Date(body.fechaNacimiento).toISOString();
  }



  const response = await fetch(`${process.env.API_URL}/clientes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return NextResponse.json(result);
}
