"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface GalleryImage {
  id: string
  image_url: string
  caption?: string
}

interface GallerySectionProps {
  gallery: GalleryImage[]
}

export function GallerySection({ gallery }: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const selectedImage = selectedIndex !== null ? gallery[selectedIndex] : null

  const handlePrevious = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < gallery.length - 1) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  return (
    <>
      {/* Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 text-balance fade-in-up">
            Gallery
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg fade-in-up">
            Check out these amazing moments captured from our programs, events, and the incredible journey of empowering
            youth across our community! Every picture tells a story of transformation and hope.
          </p>

          {gallery && gallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {gallery.map((image, index) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-lg group fade-in-up cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={image.image_url || "/placeholder.svg"}
                      alt={image.caption || "Gallery image"}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  {image.caption && <div className="bg-gray-100 p-3 text-gray-700 text-sm">{image.caption}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No images in gallery yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-4xl w-full max-h-[95vh] overflow-hidden p-0 bg-black/95 border-none">
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation Arrows */}
          {selectedIndex !== null && selectedIndex > 0 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
          )}

          {selectedIndex !== null && selectedIndex < gallery.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          )}

          {/* Full Image */}
          {selectedImage && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
              <img
                src={selectedImage.image_url || "/placeholder.svg"}
                alt={selectedImage.caption || "Gallery image"}
                className="max-w-full max-h-[75vh] object-contain rounded-lg"
              />

              {/* Caption */}
              {selectedImage.caption && (
                <div className="mt-4 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg">
                  <p className="text-white text-center text-lg">{selectedImage.caption}</p>
                </div>
              )}

              {/* Image Counter */}
              <div className="mt-4 text-white/60 text-sm">
                {selectedIndex !== null && `${selectedIndex + 1} / ${gallery.length}`}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
