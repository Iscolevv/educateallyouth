"use server"

import { cookies } from "next/headers"

const AUTHORIZED_ADMINS = [
  { email: "brianonyango1605@gmail.com", password: "eayo2025", id: "admin1" },
  { email: "mwangiarsene6@gmail.com", password: "eayo2025", id: "admin2" },
  { email: "christabelaloo28@gmail.com", password: "eayo2025", id: "admin3" },
  { email: "levismokaya220@gmail.com", password: "eayo2025", id: "admin4" },
  { email: "educateallyouthorganization@gmail.com", password: "eayo2025", id: "admin5" },
]

export async function verifyAdminAndLogin(email: string, password: string) {
  try {
    console.log("[v0] Login attempt:", email)

    const adminUser = AUTHORIZED_ADMINS.find((admin) => admin.email === email && admin.password === password)

    if (!adminUser) {
      console.log("[v0] Admin not found for email:", email)
      return { success: false, error: "Invalid login credentials" }
    }

    console.log("[v0] Admin found, setting cookie for:", adminUser.email)

    const cookieStore = await cookies()
    cookieStore.set("admin_auth", adminUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    })

    console.log("[v0] Cookie set successfully, login complete")
    return { success: true }
  } catch (error) {
    console.error("[v0] Login error:", error)
    return { success: false, error: "Login failed. Please try again." }
  }
}
