"use client"

import type React from "react"

import { useState } from "react"
import { NewsEventModal } from "@/components/news-event-modal"

interface HomePageClientProps {
  children: React.ReactNode
}

export function HomePageClient({ children }: HomePageClientProps) {
  const [selectedNewsEvent, setSelectedNewsEvent] = useState<any>(null)

  // Make these functions globally accessible by attaching to window
  if (typeof window !== "undefined") {
    ;(window as any).handleNewsEventClick = (item: any) => {
      setSelectedNewsEvent(item)
    }
    ;(window as any).handleCloseModal = () => {
      setSelectedNewsEvent(null)
    }
  }

  return (
    <>
      {children}
      {selectedNewsEvent && (
        <NewsEventModal
          item={selectedNewsEvent}
          isOpen={!!selectedNewsEvent}
          onClose={() => setSelectedNewsEvent(null)}
        />
      )}
    </>
  )
}
