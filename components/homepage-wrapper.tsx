"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function HomepageWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    // Force refresh when navigating back to homepage
    const handleRouteChange = () => {
      if (pathname === "/" && document.visibilityState === "visible") {
        window.location.reload()
      }
    }

    // Listen for visibility changes (when user navigates back)
    document.addEventListener("visibilitychange", handleRouteChange)

    return () => {
      document.removeEventListener("visibilitychange", handleRouteChange)
    }
  }, [pathname])

  return <>{children}</>
}
