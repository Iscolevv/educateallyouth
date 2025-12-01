interface GalleryItem {
  id: string
  title?: string
  image_url: string
  created_at: string
}

interface GallerySectionProps {
  gallery: GalleryItem[]
}

export default function GallerySection({ gallery }: GallerySectionProps) {
  if (!gallery || gallery.length === 0) {
    return null
  }

  return (
    <section className="py-16 md:py-24" id="gallery">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.slice(0, 8).map((item) => (
            <div key={item.id} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={item.image_url || "/placeholder.svg"}
                alt={item.title || "Gallery image"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
