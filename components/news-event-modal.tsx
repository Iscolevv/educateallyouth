"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NewsEventModalProps {
  item: any
  isOpen: boolean
  onClose: () => void
}

export function NewsEventModal({ item, isOpen, onClose }: NewsEventModalProps) {
  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-6">
          {/* Full image */}
          {item.image_url && (
            <img
              src={item.image_url || "/placeholder.svg"}
              alt={item.title}
              className="w-full rounded-lg object-contain max-h-96 mb-6"
            />
          )}

          {/* Event type and date badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium uppercase">
              {item.type}
            </span>
            {item.event_date && (
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {new Date(item.event_date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" at "}
                {new Date(item.event_date).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">{item.description}</p>
          </div>

          {/* Close button at bottom */}
          <div className="mt-8 flex justify-end">
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
