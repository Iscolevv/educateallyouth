"use client"

import { useEffect } from "react"

export function BackButtonRefresh() {
  useEffect(() => {
    const handlePopState = () => {
      // Force refresh only when navigating back to homepage
      if (window.location.pathname === "/") {
        window.location.reload()
      }
    }

    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return null
}
