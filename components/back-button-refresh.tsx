"use client"

import { useEffect } from "react"
import type { PageShowEvent } from "next/dist/shared/lib/utils"

export function BackButtonRefresh() {
  useEffect(() => {
    const handlePopState = () => {
      // Force a hard refresh when back button is pressed (works on all pages)
      if (window.location.pathname === "/") {
        window.location.reload()
      } else {
        // Navigate to homepage with hard refresh
        window.location.href = "/"
      }
    }

    // Listen for back button clicks
    window.addEventListener("popstate", handlePopState)

    // Also listen for page visibility changes (detects browser back cache)
    const handlePageShow = (event: PageShowEvent) => {
      if (event.persisted && window.location.pathname === "/") {
        window.location.reload()
      }
    }

    window.addEventListener("pageshow", handlePageShow)

    return () => {
      window.removeEventListener("popstate", handlePopState)
      window.removeEventListener("pageshow", handlePageShow)
    }
  }, [])

  return null
}
