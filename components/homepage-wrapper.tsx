"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function HomepageWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleBackButton = () => {
      if (pathname === "/") {
        // Use router.refresh() instead of full reload for better UX
        router.refresh()
      }
    }

    window.addEventListener("popstate", handleBackButton)

    return () => {
      window.removeEventListener("popstate", handleBackButton)
    }
  }, [pathname, router])

  return <>{children}</>
}
