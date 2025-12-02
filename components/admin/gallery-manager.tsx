"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GalleryForm from "./gallery-form"
import GalleryList from "./gallery-list"

export default function GalleryManager() {
  const [gallery, setGallery] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGallery() {
      const supabase = createClient()
      const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })
      setGallery(data || [])
      setLoading(false)
    }
    fetchGallery()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Gallery Image</CardTitle>
        </CardHeader>
        <CardContent>
          <GalleryForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
        </CardHeader>
        <CardContent>
          <GalleryList gallery={gallery} />
        </CardContent>
      </Card>
    </div>
  )
}
