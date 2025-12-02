"use client"

import { useEffect, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TestimonialForm from "./testimonial-form"
import TestimonialsList from "./testimonials-list"

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data, error } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })

      if (error) {
        console.log("[v0] Error fetching testimonials:", error)
        setError(error.message)
      } else {
        console.log("[v0] Fetched testimonials:", data?.length)
        setTestimonials(data || [])
      }
    } catch (err: any) {
      console.log("[v0] Exception fetching testimonials:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  if (loading) {
    return (
      <div className="animate-pulse h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        Loading testimonials...
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
          <CardTitle>Add Testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialForm onSuccess={fetchTestimonials} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Testimonials ({testimonials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialsList testimonials={testimonials} onUpdate={fetchTestimonials} />
        </CardContent>
      </Card>
    </div>
  )
}
