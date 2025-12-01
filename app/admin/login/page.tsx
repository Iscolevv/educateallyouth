"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, Suspense } from "react"
import { verifyAdminAndLogin } from "./actions"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const urlError = searchParams.get("error")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Starting login with email:", email)
      const result = await verifyAdminAndLogin(email, password)
      console.log("[v0] Login result:", result)

      if (!result.success) {
        setError(result.error || "Invalid credentials")
        setIsLoading(false)
        return
      }

      console.log("[v0] Login successful, redirecting...")
      router.push("/admin/dashboard")
    } catch (error: unknown) {
      console.error("[v0] Login catch error:", error)
      setError(error instanceof Error ? error.message : "An error occurred")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="180" height="60" viewBox="0 0 350 80" className="h-12 w-auto">
              <text x="10" y="32" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="600" fill="#0284C7">
                EducateAll
              </text>
              <line x1="10" y1="42" x2="260" y2="42" stroke="#F59E0B" strokeWidth="3" />
              <text
                x="10"
                y="62"
                fontFamily="Arial, sans-serif"
                fontSize="14"
                fontWeight="400"
                fill="#6B7280"
                letterSpacing="2"
              >
                YOUTH ORGANIZATION
              </text>
            </svg>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Enter your credentials to access the admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {(error || urlError) && (
                    <div className="space-y-2">
                      <p className="text-sm text-red-500">
                        {error ||
                          (urlError === "unauthorized"
                            ? "You are not authorized to access this area"
                            : "An error occurred")}
                      </p>
                    </div>
                  )}
                  <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
