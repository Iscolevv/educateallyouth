import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import TestimonialForm from "./testimonial-form"
import TestimonialsList from "./testimonials-list"

export default async function TestimonialsManager() {
  const supabase = await createClient()

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

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
          <TestimonialsList testimonials={testimonials || []} />
        </CardContent>
      </Card>
    </div>
  )
}
