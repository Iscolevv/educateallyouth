"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Home } from "lucide-react"

export default function AdminHeader({ userEmail }: { userEmail: string }) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const handleBackToHome = () => {
    window.location.href = "/"
  }

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <svg width="160" height="50" viewBox="0 0 350 80" className="h-10 w-auto">
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
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden md:inline">{userEmail}</span>
            <Button onClick={handleBackToHome} variant="outline" size="sm" className="gap-2 bg-transparent">
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Button>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
