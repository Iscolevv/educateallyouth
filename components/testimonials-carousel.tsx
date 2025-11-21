"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"

export function TestimonialsCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Auto-advance every 5 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  if (!testimonials || testimonials.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No testimonials yet.</p>
      </div>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="w-full">
      {/* Mobile Carousel View */}
      <div className="lg:hidden">
        <div className="relative overflow-hidden">
          <div
            className="transition-opacity duration-700 ease-in-out"
            key={currentIndex}
            style={{ animation: "fadeInOut 5s ease-in-out" }}
          >
            <Card className="p-6 sm:p-8 bg-white shadow-lg">
              <div className="text-5xl text-teal-600 opacity-20 mb-4 font-serif">"</div>
              <p className="text-gray-700 leading-relaxed mb-6 italic text-base sm:text-lg">
                {currentTestimonial.content}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {currentTestimonial.image_url ? (
                  <img
                    src={currentTestimonial.image_url || "/placeholder.svg"}
                    alt={currentTestimonial.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {currentTestimonial.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{currentTestimonial.name}</h4>
                  {currentTestimonial.role && (
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{currentTestimonial.role}</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Desktop Grid View */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="p-8 relative">
            <div className="text-7xl text-teal-600 opacity-30 absolute top-2 left-4 font-serif leading-none">"</div>
            <div className="relative z-10">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg italic pt-8">{testimonial.content}</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                {testimonial.image_url ? (
                  <img
                    src={testimonial.image_url || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">{testimonial.name}</h4>
                  {testimonial.role && <p className="text-sm text-gray-600 truncate">{testimonial.role}</p>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
