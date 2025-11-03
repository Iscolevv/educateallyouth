"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function GalleryList({ gallery }: { gallery: any[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    const supabase = createClient()
    const { error } = await supabase.from("gallery").delete().eq("id", id)

    if (error) {
      alert("Error deleting image")
      return
    }

    router.refresh()
  }

  if (gallery.length === 0) {
    return <p className="text-gray-500">No images in gallery yet.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gallery.map((image) => (
        <div key={image.id} className="relative group">
          <img
            src={image.image_url || "/placeholder.svg"}
            alt={image.caption || "Gallery image"}
            className="w-full aspect-square object-cover rounded-lg"
          />
          {image.caption && <p className="text-sm text-gray-600 mt-1">{image.caption}</p>}
          <Button
            onClick={() => handleDelete(image.id)}
            size="sm"
            variant="destructive"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Delete
          </Button>
        </div>
      ))}
    </div>
  )
}
