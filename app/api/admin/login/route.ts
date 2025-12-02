import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const ADMIN_EMAIL = "educateallyouthorganization@gmail.com"
const ADMIN_PASSWORD = "eayo2025"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Simple credential check
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      cookieStore.set("admin_auth", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Login failed" }, { status: 500 })
  }
}
