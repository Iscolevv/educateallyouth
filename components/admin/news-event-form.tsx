"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { createNewsEvent, updateNewsEvent } from "@/app/admin/actions"

function compressImage(file: File, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target?.result as string
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        resolve(canvas.toDataURL("image/jpeg", quality))
      }
      img.onerror = reject
    }
    reader.onerror = reject
  })
}

export default function NewsEventForm({ editItem, onEditComplete }: { editItem?: any; onEditComplete?: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [published, setPublished] = useState(false)
  const [type, setType] = useState<"news" | "event">("news")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadMode, setUploadMode] = useState<"url" | "file">("url")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    if (editItem) {
      setTitle(editItem.title || "")
      setContent(editItem.content || "")
      setImageUrl(editItem.image_url || "")
      setEventDate(editItem.event_date ? new Date(editItem.event_date).toISOString().slice(0, 16) : "")
      setPublished(editItem.published || false)
      setType(editItem.type || "news")
    }
  }, [editItem])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    setIsLoading(true)

    try {
      const compressed = await compressImage(file)
      setImageUrl(compressed)
      alert("Image compressed and ready to upload!")
    } catch (error) {
      console.error("[v0] Error compressing image:", error)
      alert("Error processing image. Please try a different image.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const data = {
        title,
        content,
        image_url: imageUrl,
        event_date: eventDate || new Date().toISOString(),
        published,
        type,
      }

      if (editItem) {
        await updateNewsEvent(editItem.id, data)
        alert("News/Event updated successfully!")
        onEditComplete?.()
      } else {
        await createNewsEvent(data)
        alert("News/Event added successfully!")
      }

      // Reset form
      setTitle("")
      setContent("")
      setImageUrl("")
      setEventDate("")
      setPublished(false)
      setType("news")
      setSelectedFile(null)
    } catch (error) {
      console.error("[v0] Error saving news/event:", error)
      alert(`Error saving news/event: ${error instanceof Error ? error.message : "Please try again."}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="type">Type *</Label>
        <Select value={type} onValueChange={(value: "news" | "event") => setType(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="news">News</SelectItem>
            <SelectItem value="event">Event</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="title">Title *</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Enter title" />
      </div>

      <div>
        <Label htmlFor="content">Content *</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          placeholder="Enter content"
        />
      </div>

      <div>
        <Label>Image</Label>
        <div className="flex gap-2 mb-2">
          <Button
            type="button"
            size="sm"
            variant={uploadMode === "url" ? "default" : "outline"}
            onClick={() => setUploadMode("url")}
          >
            Enter URL
          </Button>
          <Button
            type="button"
            size="sm"
            variant={uploadMode === "file" ? "default" : "outline"}
            onClick={() => setUploadMode("file")}
          >
            Choose from Device
          </Button>
        </div>

        {uploadMode === "url" ? (
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        ) : (
          <div className="space-y-2">
            <Input id="imageFile" type="file" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
            {selectedFile && (
              <p className="text-sm text-gray-600">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        )}

        {imageUrl && (
          <div className="mt-2">
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Preview"
              className="w-full max-w-xs h-32 object-cover rounded border"
            />
          </div>
        )}
      </div>

      <div>
        <Label htmlFor="eventDate">Event Date (optional)</Label>
        <Input id="eventDate" type="datetime-local" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="published" checked={published} onCheckedChange={(checked) => setPublished(checked as boolean)} />
        <Label htmlFor="published" className="cursor-pointer">
          Publish immediately
        </Label>
      </div>

      <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
        {isLoading ? "Saving..." : editItem ? "Update News/Event" : "Add News/Event"}
      </Button>

      {editItem && onEditComplete && (
        <Button type="button" variant="outline" onClick={onEditComplete} className="ml-2 bg-transparent">
          Cancel
        </Button>
      )}
    </form>
  )
}
