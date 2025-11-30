"use server"

import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function verifyAdminAndLogin(email: string, password: string) {
  try {
    console.log("[v0] Admin login attempt for:", email)

    const supabase = await createClient()

    // Query admin_users table directly - check both email and password
    const { data: adminUser, error: queryError } = await supabase
      .from("admin_users")
      .select("id, email")
      .eq("email", email.toLowerCase())
      .eq("password", password)
      .single()

    console.log("[v0] Query result:", { data: adminUser, error: queryError?.message })

    if (queryError) {
      console.log("[v0] Query error:", queryError.message)
      return { success: false, error: "Invalid login credentials" }
    }

    if (!adminUser) {
      console.log("[v0] No admin found for email:", email)
      return { success: false, error: "Invalid login credentials" }
    }

    console.log("[v0] Admin found, setting session for:", email)

    // Set auth cookie
    const cookieStore = await cookies()
    cookieStore.set("admin_auth", adminUser.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    console.log("[v0] Admin login successful for:", email)
    return { success: true }
  } catch (error) {
    console.error("[v0] Admin login error:", error)
    return { success: false, error: "Login failed. Please try again." }
  }
}
