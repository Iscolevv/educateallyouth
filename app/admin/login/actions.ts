"use server"

import { createClient } from "@/lib/supabase/server"

export async function verifyAdminAndLogin(email: string, password: string) {
  const supabase = await createClient()

  // Check if email exists in admin_users table
  const { data: adminUser, error: queryError } = await supabase
    .from("admin_users")
    .select("email")
    .eq("email", email.toLowerCase())
    .single()

  if (queryError || !adminUser) {
    return { success: false, error: "You are not authorized to access the admin panel" }
  }

  // Sign in with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (authError) {
    return { success: false, error: "Invalid login credentials" }
  }

  return { success: true }
}
