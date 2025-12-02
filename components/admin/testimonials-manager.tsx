"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TestimonialForm from "./testimonial-form"
import TestimonialsList from "./testimonials-list"

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      const supabase = createClient()
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false })
      setTestimonials(data || [])
      setLoading(false)
    }
    fetchTestimonials()
  }, [])

  if (loading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-lg"></div>
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Testimonial</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <TestimonialsList testimonials={testimonials} />
        </CardContent>
      </Card>
    </div>
  )
}
