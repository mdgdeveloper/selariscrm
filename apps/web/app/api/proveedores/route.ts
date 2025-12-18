import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  // Convert body to data: { body }
  const data = { data: body };

  const response = await fetch(`${process.env.API_URL}/proveedores`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  console.log('Proveedor creado:', result);

  return NextResponse.json(result);
}
