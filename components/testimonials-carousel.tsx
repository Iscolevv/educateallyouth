"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

export function TestimonialsCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay || testimonials.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000) // Auto-advance every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className="relative w-full max-w-2xl mx-auto"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="testimonial-carousel-container">
        <Card className="p-8 min-h-[350px] flex flex-col justify-between testimonial-fade-animation">
          <div>
            <div className="text-7xl text-teal-600 opacity-30 font-serif leading-none mb-4">"</div>
            <p className="text-gray-700 leading-relaxed text-lg italic">{currentTestimonial.content}</p>
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-200 mt-6">
            {currentTestimonial.image_url ? (
              <img
                src={currentTestimonial.image_url || "/placeholder.svg"}
                alt={currentTestimonial.name}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
                {currentTestimonial.name.charAt(0)}
              </div>
            )}
            <div>
              <h4 className="font-bold text-gray-900">{currentTestimonial.name}</h4>
              {currentTestimonial.role && <p className="text-sm text-gray-600">{currentTestimonial.role}</p>}
            </div>
          </div>
        </Card>
      </div>

      {/* Indicator dots - subtle and minimal */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlay(false)
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-teal-600 w-8" : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
