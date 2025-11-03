"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function TestimonialsList({ testimonials }: { testimonials: any[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    const supabase = createClient()
    const { error } = await supabase.from("testimonials").delete().eq("id", id)

    if (error) {
      alert("Error deleting testimonial")
      return
    }

    router.refresh()
  }

  if (testimonials.length === 0) {
    return <p className="text-gray-500">No testimonials yet.</p>
  }

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            {testimonial.image_url ? (
              <img
                src={testimonial.image_url || "/placeholder.svg"}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold">
                {testimonial.name.charAt(0)}
              </div>
            )}
            <div className="flex-1">
              <h3 className="font-semibold">{testimonial.name}</h3>
              {testimonial.role && <p className="text-sm text-gray-600">{testimonial.role}</p>}
              <p className="text-gray-600 mt-2">{testimonial.content}</p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-500">
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <Button onClick={() => handleDelete(testimonial.id)} size="sm" variant="outline" className="text-red-600">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
