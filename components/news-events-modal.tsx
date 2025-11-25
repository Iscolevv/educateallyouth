"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface NewsEvent {
  id: string
  title: string
  description: string
  type: "news" | "event"
  event_date?: string
  image_url?: string
}

interface NewsEventsModalProps {
  item: NewsEvent | null
  isOpen: boolean
  onClose: () => void
}

export function NewsEventsModal({ item, isOpen, onClose }: NewsEventsModalProps) {
  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Full Image */}
        {item.image_url && (
          <img src={item.image_url || "/placeholder.svg"} alt={item.title} className="w-full h-auto object-cover" />
        )}

        {/* Details Section */}
        <div className="p-6 bg-white">
          {/* Type and Date */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold uppercase">
              {item.type}
            </span>
            {item.event_date && (
              <span className="text-sm text-gray-600 font-medium">
                {new Date(item.event_date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h2>

          {/* Description */}
          <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{item.description}</p>

          {/* Close Button */}
          <Button onClick={onClose} variant="outline" className="mt-6 w-full bg-transparent">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
