"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createTestimonial } from "@/app/admin/actions"

export default function TestimonialForm() {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [rating, setRating] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createTestimonial({
        name,
        role,
        content,
        image_url: imageUrl,
        rating,
      })

      setName("")
      setRole("")
      setContent("")
      setImageUrl("")
      setRating(5)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error saving testimonial:", error)
      alert("Error saving testimonial. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter name" />
      </div>

      <div>
        <Label htmlFor="role">Role/Title</Label>
        <Input
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Student, Volunteer"
        />
      </div>

      <div>
        <Label htmlFor="content">Testimonial *</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          placeholder="Enter testimonial"
        />
      </div>

      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div>
        <Label htmlFor="rating">Rating (1-5)</Label>
        <Input
          id="rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number.parseInt(e.target.value))}
        />
      </div>

      <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
        {isLoading ? "Saving..." : "Add Testimonial"}
      </Button>
    </form>
  )
}
