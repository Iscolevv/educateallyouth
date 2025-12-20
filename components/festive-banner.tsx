"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

export function FestiveBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  useEffect(() => {
    const now = new Date()
    const festiveStart = new Date("2025-12-01T00:00:00")
    const festiveEnd = new Date("2026-01-06T00:00:00")

    // Check if we're in the festive period
    if (now >= festiveStart && now <= festiveEnd) {
      // Check if user has closed the banner in this session
      const bannerClosed = sessionStorage.getItem("festiveBannerClosed")
      if (!bannerClosed) {
        setIsVisible(true)
      }
    }
  }, [])

  const handleClose = () => {
    setIsClosed(true)
    setIsVisible(false)
    sessionStorage.setItem("festiveBannerClosed", "true")
  }

  if (!isVisible || isClosed) return null

  return (
    <div className="relative animate-fade-in bg-gradient-to-r from-red-600 via-green-600 to-red-600 px-4 py-3 text-center text-white">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl">🎄</span>
        <p className="text-sm font-medium md:text-base">
          Season's Greetings from EducateAll Youth!{" "}
          <Link href="/festive-greetings" className="underline hover:text-yellow-200">
            View our festive message
          </Link>
        </p>
        <span className="text-xl">🎊</span>
      </div>
      <button
        onClick={handleClose}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/20"
        aria-label="Close banner"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
