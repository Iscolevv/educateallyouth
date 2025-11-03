"use server"

import { createClient } from "@/lib/supabase/server"

export async function verifyAdminAndLogin(email: string, password: string) {
  const supabase = await createClient()

  const adminEmail = "brianonyango1605@gmail.com"

  if (email.toLowerCase() !== adminEmail.toLowerCase()) {
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
