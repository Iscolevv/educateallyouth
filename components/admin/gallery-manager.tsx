"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GalleryForm from "./gallery-form"
import GalleryList from "./gallery-list"

export default function GalleryManager() {
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchGallery = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

      if (error) {
        console.log("[v0] Error fetching gallery:", error)
        setError(error.message)
      } else {
        console.log("[v0] Fetched gallery:", data?.length)
        setGallery(data || [])
      }
    } catch (err: any) {
      console.log("[v0] Exception fetching gallery:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchGallery()
  }, [fetchGallery])

  if (loading) {
    return (
      <div className="animate-pulse h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        Loading gallery...
      </div>
    )
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-lg">Error: {error}</div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Gallery Image</CardTitle>
        </CardHeader>
        <CardContent>
          <GalleryForm onSuccess={fetchGallery} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images ({gallery.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <GalleryList gallery={gallery} onUpdate={fetchGallery} />
        </CardContent>
      </Card>
    </div>
  )
}
