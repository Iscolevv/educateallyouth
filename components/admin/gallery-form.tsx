"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { createGalleryImage } from "@/app/admin/actions"
import { Upload, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function GalleryForm() {
  const [imageUrl, setImageUrl] = useState("")
  const [caption, setCaption] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("url")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const compressImage = (file: File, maxWidth = 1200, quality = 0.8): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          // Resize if image is too large
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext("2d")
          if (!ctx) {
            reject(new Error("Failed to get canvas context"))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          // Convert to base64 with compression
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality)
          resolve(compressedDataUrl)
        }
        img.onerror = () => reject(new Error("Failed to load image"))
        img.src = e.target?.result as string
      }
      reader.onerror = () => reject(new Error("Failed to read file"))
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file")
        return
      }

      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        setError(`Image is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Please select an image under 10MB.`)
        return
      }

      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      let finalImageUrl = imageUrl

      if (uploadMethod === "file" && selectedFile) {
        console.log("[v0] Compressing image before upload...")
        finalImageUrl = await compressImage(selectedFile, 1200, 0.8)
        console.log("[v0] Image compressed successfully")
      }

      if (!finalImageUrl) {
        setError("Please provide an image URL or select a file")
        setIsLoading(false)
        return
      }

      console.log("[v0] Submitting gallery image...")
      await createGalleryImage({
        image_url: finalImageUrl,
        caption: caption || "",
      })

      setImageUrl("")
      setCaption("")
      setSelectedFile(null)
      alert("Image added successfully!")
    } catch (error: any) {
      console.error("[v0] Error adding image:", error)
      const errorMessage = error?.message || "Error adding image. Please try again."
      setError(errorMessage)
      alert(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex gap-4 mb-4">
        <Button
          type="button"
          variant={uploadMethod === "url" ? "default" : "outline"}
          onClick={() => {
            setUploadMethod("url")
            setError(null)
            setSelectedFile(null)
          }}
          className={uploadMethod === "url" ? "bg-teal-600 hover:bg-teal-700" : ""}
        >
          Image URL
        </Button>
        <Button
          type="button"
          variant={uploadMethod === "file" ? "default" : "outline"}
          onClick={() => {
            setUploadMethod("file")
            setError(null)
            setImageUrl("")
          }}
          className={uploadMethod === "file" ? "bg-teal-600 hover:bg-teal-700" : ""}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload from Device
        </Button>
      </div>

      {uploadMethod === "url" ? (
        <div>
          <Label htmlFor="imageUrl">Image URL *</Label>
          <Input
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            placeholder="https://example.com/image.jpg"
          />
        </div>
      ) : (
        <div>
          <Label htmlFor="imageFile">Select Image *</Label>
          <Input
            id="imageFile"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="cursor-pointer"
          />
          {selectedFile && (
            <p className="text-sm text-gray-600 mt-2">
              Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
            </p>
          )}
          <p className="text-xs text-gray-500 mt-2">
            Tip: Images will be automatically compressed to ensure smooth upload. Maximum size: 10MB
          </p>
        </div>
      )}

      <div>
        <Label htmlFor="caption">Caption (optional)</Label>
        <Input
          id="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter image caption"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="bg-teal-600 hover:bg-teal-700">
        {isLoading ? "Adding..." : "Add Image"}
      </Button>
    </form>
  )
}
