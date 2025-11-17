"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Share2, Calendar, Tag } from 'lucide-react'

const CATEGORIES = [
  "Study Tips",
  "Scholarships Alerts",
  "Motivational Messages",
  "Digital Literacy Lessons",
  "Career Guidance",
  "General Announcements",
]

interface Post {
  id: string
  title: string
  content: string
  image_url: string | null
  category: string
  created_at: string
}

interface LearningHubClientProps {
  initialPosts: Post[]
}

const POSTS_PER_PAGE = 6

export default function LearningHubClient({ initialPosts }: LearningHubClientProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null)

  // Filter posts
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = !selectedCategory || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [initialPosts, searchTerm, selectedCategory])

  // Paginate posts
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const handleShare = async (post: Post) => {
    const shareText = `Check out this post from EducateAll Youth Learning Hub: "${post.title}"`
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: shareText,
          url: window.location.href,
        })
      } catch (error) {
        console.error("[v0] Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      const text = `${post.title}\n\n${shareText}`
      navigator.clipboard.writeText(text)
      alert("Post link copied to clipboard!")
    }
  }

  const getShortDescription = (content: string) => {
    return content.length > 150 ? content.substring(0, 150) + "..." : content
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Input
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1)
          }}
          className="w-full px-4 py-3 text-lg"
        />
      </div>

      {/* Filter by Category */}
      <div className="space-y-3">
        <p className="text-sm font-semibold text-muted-foreground">Filter by Category</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedCategory(null)
              setCurrentPage(1)
            }}
            className={selectedCategory === null ? "bg-teal-600 hover:bg-teal-700" : ""}
          >
            All
          </Button>
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(cat)
                setCurrentPage(1)
              }}
              className={selectedCategory === cat ? "bg-teal-600 hover:bg-teal-700" : ""}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      {paginatedPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No posts found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map((post) => (
            <div
              key={post.id}
              className="group rounded-lg border bg-card hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* Image */}
              {post.image_url && (
                <div className="relative w-full h-48 bg-muted overflow-hidden">
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex flex-col flex-1 p-4">
                {/* Category Tag */}
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-1 rounded">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg mb-2 line-clamp-2 text-foreground">{post.title}</h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
                  {getShortDescription(post.content)}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                  >
                    Read More
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post)}
                    className="text-teal-600 hover:text-teal-700"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Expanded Content Modal */}
              {expandedPostId === post.id && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                      <h2 className="text-2xl font-bold">{post.title}</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedPostId(null)}
                      >
                        ✕
                      </Button>
                    </div>

                    <div className="p-6 space-y-4">
                      {post.image_url && (
                        <img
                          src={post.image_url || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="bg-teal-50 text-teal-600 px-3 py-1 rounded-full font-semibold">
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="prose prose-sm max-w-none">
                        {post.content.split("\n").map((paragraph, idx) => (
                          <p key={idx} className="text-foreground leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      <div className="pt-4 border-t flex gap-2">
                        <Button
                          onClick={() => handleShare(post)}
                          className="flex-1 bg-teal-600 hover:bg-teal-700"
                        >
                          <Share2 className="w-4 h-4 mr-2" />
                          Share Post
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setExpandedPostId(null)}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={currentPage === page ? "bg-teal-600 hover:bg-teal-700" : ""}
              >
                {page}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
