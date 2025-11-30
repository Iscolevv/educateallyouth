import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminDashboard() {
  const cookieStore = cookies()
  const adminAuth = cookieStore.get("admin_auth")

  if (!adminAuth) {
    redirect("/admin/login")
  }
}
