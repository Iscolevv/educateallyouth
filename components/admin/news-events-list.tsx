"use client"

import { Button } from "@/components/ui/button"
import { deleteNewsEvent } from "@/app/admin/actions"
import { useState } from "react"

export default function NewsEventsList({ newsEvents, onEdit }: { newsEvents: any[]; onEdit: (item: any) => void }) {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return

    setIsDeleting(id)
    try {
      await deleteNewsEvent(id)
      alert("Item deleted successfully!")
    } catch (error) {
      console.error("[v0] Error deleting item:", error)
      alert("Error deleting item. Please try again.")
    } finally {
      setIsDeleting(null)
    }
  }

  if (newsEvents.length === 0) {
    return <p className="text-gray-500">No news or events yet.</p>
  }

  return (
    <div className="space-y-4">
      {newsEvents.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-teal-100 text-teal-700">
                  {item.type === "event" ? "Event" : "News"}
                </span>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs ${
                    item.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item.published ? "Published" : "Draft"}
                </span>
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{item.content}</p>
              {item.event_date && (
                <p className="text-sm text-gray-500 mt-2">Event Date: {new Date(item.event_date).toLocaleString()}</p>
              )}
              {item.image_url && (
                <img
                  src={item.image_url || "/placeholder.svg"}
                  alt={item.title}
                  className="mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button onClick={() => onEdit(item)} size="sm" variant="outline" className="text-teal-600">
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(item.id)}
              size="sm"
              variant="outline"
              className="text-red-600"
              disabled={isDeleting === item.id}
            >
              {isDeleting === item.id ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
