"use client"

import { useEffect } from "react"

export function BackButtonRefresh() {
  useEffect(() => {
    const handlePopState = () => {
      // Only reload if we're navigating back to homepage
      if (window.location.pathname === "/") {
        window.location.href = "/" + "?t=" + Date.now() // Force hard refresh with cache buster
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return null
}

interface PageShowEvent extends Event {
  persisted: boolean
}
