"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NewsEventForm from "./news-event-form"
import NewsEventsList from "./news-events-list"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function NewsEventsManager() {
  const [newsEvents, setNewsEvents] = useState<any[]>([])
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const loadNewsEvents = async () => {
    const supabase = createClient()
    const { data } = await supabase.from("news_events").select("*").order("created_at", { ascending: false })
    setNewsEvents(data || [])
    setIsLoading(false)
  }

  useEffect(() => {
    loadNewsEvents()
  }, [])

  const handleEdit = (item: any) => {
    setEditingItem(item)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEditComplete = () => {
    setEditingItem(null)
    loadNewsEvents()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingItem ? "Edit News/Event" : "Add News/Event"}</CardTitle>
        </CardHeader>
        <CardContent>
          <NewsEventForm editItem={editingItem} onEditComplete={handleEditComplete} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing News & Events</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <NewsEventsList newsEvents={newsEvents} onEdit={handleEdit} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
