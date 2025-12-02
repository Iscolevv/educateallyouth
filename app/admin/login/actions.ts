"use server"

import { cookies } from "next/headers"

export async function verifyAdminAndLogin(email: string, password: string) {
  const ADMIN_EMAIL = "educateallyouthorganization@gmail.com"
  const ADMIN_PASSWORD = "eayo2025"

  // Simple exact match check
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return { success: false, error: "Invalid email or password" }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return { success: true }
}
