import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Convert body to data: { body }
  const data = { data: body };

  const response = await fetch(`${process.env.API_URL}/clientes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return NextResponse.json(result);
}
