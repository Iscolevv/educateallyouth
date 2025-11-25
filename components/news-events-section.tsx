"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { NewsEventsModal } from "./news-events-modal"

interface NewsEvent {
  id: string
  title: string
  description: string
  type: "news" | "event"
  event_date?: string
  image_url?: string
}

interface NewsEventsSectionProps {
  newsEvents: NewsEvent[]
}

export function NewsEventsSection({ newsEvents }: NewsEventsSectionProps) {
  const [selectedItem, setSelectedItem] = useState<NewsEvent | null>(null)

  return (
    <>
      {/* News & Events Section */}
      <section id="news" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance">News & Events</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
            Stay updated with our latest happenings, upcoming events, and exciting announcements! There's always
            something amazing happening at EducateAll Youth Organization.
          </p>

          {newsEvents && newsEvents.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-6">
              {newsEvents.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.image_url && (
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium uppercase">
                        {item.type}
                      </span>
                      {item.event_date && (
                        <span className="text-sm text-gray-500">
                          {new Date(item.event_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No news or events available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <NewsEventsModal item={selectedItem} isOpen={selectedItem !== null} onClose={() => setSelectedItem(null)} />
    </>
  )
}
