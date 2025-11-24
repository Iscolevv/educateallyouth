"use client"

import { useEffect } from "react"

export function BackButtonRefresh() {
  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === "/") {
        window.location.reload()
      } else {
        // Navigate to homepage with hard refresh
        window.location.href = "/"
      }
    }

    // Listen for back button clicks
    window.addEventListener("popstate", handlePopState)

    const handlePageShow = (event: Event) => {
      // Type the event properly as PageShowEvent
      const pageShowEvent = event as PageShowEvent
      if (pageShowEvent.persisted && window.location.pathname === "/") {
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

interface PageShowEvent extends Event {
  persisted: boolean
}
