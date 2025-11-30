"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const CREATIVE_CATEGORIES = ["Poems", "Art", "Spoken Art", "Short Stories"]

export default function SubmitPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author_name: "",
    author_email: "",
    author_phone: "",
    author_bio: "",
    author_instagram: "",
    category: "Poems",
    image_url: "",
    video_url: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setIsSubmitting(true)
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64String = event.target?.result as string
        setUploadedImage(base64String)
        setFormData({ ...formData, image_url: base64String })
        setError(null)
      }
      reader.onerror = () => {
        setError("Failed to read image file")
      }
      reader.readAsDataURL(file)
    } catch (err) {
      console.error("Error processing image:", err)
      setError(err instanceof Error ? err.message : "Failed to process image")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("video/")) {
      setError("Please upload a valid video file")
      return
    }

    const maxSize = 50 * 1024 * 1024 // 50MB
    if (file.size > maxSize) {
      setError("Video file is too large. Maximum size is 50MB.")
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)

      const video = document.createElement("video")
      const objectUrl = URL.createObjectURL(file)

      video.preload = "metadata"
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(objectUrl)

        if (video.duration > 90) {
          setError("Video must be 90 seconds or less. Your video is " + Math.round(video.duration) + " seconds.")
          setIsSubmitting(false)
          return
        }

        const reader = new FileReader()
        reader.onload = (event) => {
          const base64String = event.target?.result as string
          setUploadedVideo(base64String)
          setFormData({ ...formData, video_url: base64String })
          setError(null)
          setIsSubmitting(false)
        }
        reader.onerror = () => {
          setError("Failed to read video file")
          setIsSubmitting(false)
        }
        reader.readAsDataURL(file)
      }

      video.onerror = () => {
        setError("Failed to load video file")
        URL.revokeObjectURL(objectUrl)
        setIsSubmitting(false)
      }

      video.src = objectUrl
    } catch (err) {
      console.error("Error processing video:", err)
      setError(err instanceof Error ? err.message : "Failed to process video")
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

      const { error: submitError } = await supabase.from("creative_submissions").insert({
        title: formData.title,
        content: formData.content,
        author_name: formData.author_name,
        author_email: formData.author_email,
        author_phone: formData.author_phone,
        author_bio: formData.author_bio,
        author_instagram: formData.author_instagram,
        category: formData.category,
        image_url: formData.image_url,
        video_url: formData.video_url,
        published: false,
      })

      if (submitError) throw submitError

      alert("Thank you for your submission! Our team will review it and publish it soon.")
      router.push("/showcase")
    } catch (err) {
      console.error("Error submitting:", err)
      setError(err instanceof Error ? err.message : "Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/showcase" className="text-teal-600 hover:text-teal-700 font-semibold">
            ← Back to Showcase
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share Your Creative Work</CardTitle>
            <CardDescription>
              Submit your poems, art, spoken art, or stories to our community showcase. Your work will be reviewed
              before publication.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2">Your Name *</label>
                <Input
                  required
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Email Address *</label>
                <Input
                  required
                  type="email"
                  value={formData.author_email}
                  onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
                  placeholder="your@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    value={formData.author_phone}
                    onChange={(e) => setFormData({ ...formData, author_phone: e.target.value })}
                    placeholder="+254..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Instagram Handle</label>
                  <Input
                    value={formData.author_instagram}
                    onChange={(e) => setFormData({ ...formData, author_instagram: e.target.value })}
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">About You (Bio)</label>
                <Textarea
                  value={formData.author_bio}
                  onChange={(e) => setFormData({ ...formData, author_bio: e.target.value })}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  {CREATIVE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Title of Your Work *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter the title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Your Work/Content *</label>
                <Textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Share your poem, story, or work here..."
                  rows={8}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Image/Poster (Optional)</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                  >
                    {uploadedImage ? "✓ Image Uploaded" : "Upload from Device"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                {uploadedImage && (
                  <div className="mt-2 p-2 bg-teal-50 rounded text-sm text-teal-700">Image uploaded successfully</div>
                )}
                <p className="text-xs text-gray-500 mt-2">Or paste URL:</p>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>

              {formData.category === "Art" && (
                <div>
                  <label className="block text-sm font-semibold mb-2">Video (Optional - Art Only)</label>
                  <p className="text-xs text-gray-600 mb-2">Upload a video of your art (max 90 seconds)</p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => videoInputRef.current?.click()}
                      className="flex-1"
                      disabled={isSubmitting}
                    >
                      {uploadedVideo ? "✓ Video Uploaded" : "Upload Video from Device"}
                    </Button>
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                  </div>
                  {uploadedVideo && (
                    <div className="mt-2 p-2 bg-teal-50 rounded text-sm text-teal-700">
                      Video uploaded successfully (max 90 seconds)
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">Or paste video URL:</p>
                  <Input
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://example.com/video.mp4"
                    className="mt-1"
                  />
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-teal-600 hover:bg-teal-700 text-white flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit for Review"}
                </Button>
                <Link href="/showcase" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
