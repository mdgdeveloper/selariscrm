import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {

  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const response = await fetch(process.env.API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ message: errorData.message || "Login failed" }, { status: response.status })
    }

    const data = await response.json()
    const token = data.access_token

    const res = NextResponse.json({ message: "Login successful" }, { status: 200 })
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return res
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error: " + error }, { status: 500 })
  }

}