import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function PUT(req: NextRequest, { params }: {
  params: Promise<{
    id: string
  }>
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const body = await req.json();
  const id = (await params).id;
  // Convert body to data: { body }
  const data = { data: body };

  const response = await fetch(`${process.env.API_URL}/proveedores/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return NextResponse.json(result);
}
