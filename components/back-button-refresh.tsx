"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function BackButtonRefresh() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Handle browser back button
    const handlePopState = () => {
      // If user is navigating back to homepage, force a hard refresh
      if (pathname === "/" || window.location.pathname === "/") {
        window.location.href = "/"
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [pathname])

  return null
}
